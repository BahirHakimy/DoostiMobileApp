import asyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefix = "cache-";
const expireyInMinitues = 5;

const store = async (key, value) => {
  try {
    const item = { value, timestamp: Date.now() };
    await asyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > expireyInMinitues;
};

const get = async (key) => {
  try {
    const value = await asyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;

    if (isExpired(item)) {
      await asyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};
export default {
  store,
  get,
};
