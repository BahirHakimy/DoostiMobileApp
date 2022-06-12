import { create } from "apisauce";

import cache from "../utility/cache";
import authStorage from "./authStorage";

const defaultClient = create({
  baseURL: "http://192.168.43.172:8000/dostiApi/",
});
const protectedClient = create({
  baseURL: "http://192.168.43.172:8000/dostiApi/",
});

protectedClient.addAsyncRequestTransform(async (request) => {
  const tokens = await authStorage.getTokens();
  request.headers["Authorization"] = `Bearer ${tokens.access || ""}`;
});

let retryCount = 0;
protectedClient.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orignalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid"
    ) {
      if (retryCount < 3) {
        console.log("Refreshing token");
        retryCount++;
        const tokens = await authStorage.getTokens();
        return defaultClient
          .post("token/refresh/", { refresh: tokens.refresh })
          .then(
            async (response) => {
              retryCount = 0;
              await authStorage.storeTokens(response.data);
              protectedClient.headers["Authorization"] = `Bearer ${
                response.data.access || ""
              }`;
              orignalRequest.headers["Authorization"] = `Bearer ${
                response.data.access || ""
              }`;

              return protectedClient.axiosInstance(orignalRequest);
            },
            (error) => Promise.reject(error)
          );
      } else {
        console.log("Both tokens expired");
        return Promise.reject({
          response: {
            message: "Authorization tokens has expired please reAuthenticate",
          },
        });
      }
    }
    return Promise.reject(error);
  }
);

const get = defaultClient.get;
defaultClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    console.log("Refreshing cache");
    await cache.store(url, response.data);
    return response;
  }
  const data = await cache.get(url);
  console.log("Loading cached data");
  return data ? { ok: true, data } : response;
};

export { defaultClient, protectedClient };
