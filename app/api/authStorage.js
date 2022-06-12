import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "tokens";

const storeTokens = async (tokens) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(tokens));
  } catch (error) {
    console.log("Error storing the tokens", error);
  }
};

const getTokens = async () => {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  } catch (error) {
    console.log("Error getting the tokens", error);
  }
};

const getUser = async () => {
  const tokens = await getTokens();
  return tokens ? jwtDecode(tokens?.access) : null;
};
const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the tokens", error);
  }
};

export default { storeTokens, getUser, removeTokens, getTokens };
