import { defaultClient, protectedClient } from "./client";
import * as mime from "mime";

const endpoint = "register/personalInfo/";

const getListings = () => protectedClient.get(endpoint);

const getCategories = () => protectedClient.get(`${endpoint}categories/`);

const registerProfile = (data, onUpload) => {
  return defaultClient.post("register/personalInfo/", createFormData(data), {
    onUploadProgress: (progress) => onUpload(progress.loaded / progress.total),
  });
};

const createFormData = (data) => {
  const formData = new FormData();
  formData.append("username", data.username);
  const date = new Date(data.birthdate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fdate = `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
  formData.append("date_of_birth", fdate);
  formData.append("country", data?.country?.label);
  formData.append("city", data?.city?.label);
  formData.append("workplace", data?.workplace);
  formData.append("bio", data?.bio);
  formData.append("marital_state", data?.maritalstate?.value);
  if (data.image) {
    formData.append("profile_pic", {
      type: mime.getType(data.image),
      name: data.image.split("/").pop(),
      uri: data.image,
    });
  }
  // console.log(formData);
  return formData;
};

export default { getCategories, getListings, createFormData, registerProfile };
