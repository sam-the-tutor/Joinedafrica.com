import { AES, enc } from "crypto-js";

export function setSessionStorage(key, value, isConfidential) {
  if (isConfidential) {
    sessionStorage.setItem(
      key,
      AES.encrypt(
        value,
        "Joined_Africa_is_the_number_one_online_marketplace_in_the_world"
      ).toString()
    );
  } else {
    sessionStorage.setItem(key, value);
  }
}
export function getFromSessionStorage(key, isConfidential) {
  if (isConfidential) {
    return AES.decrypt(
      sessionStorage.getItem(key),
      "Joined_Africa_is_the_number_one_online_marketplace_in_the_world"
    ).toString(enc.Utf8);
  } else {
    return sessionStorage.getItem(key);
  }
}
export function getUniqueId() {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
}

export function createObjectURLFromArrayOfBytes(file) {
  return URL.createObjectURL(new Blob([file], { type: "image/png" }));
}

export function isAdmin(principal) {
  return (
    (process.env.NETWORK === "local" &&
      import.meta.env.VITE_APP_LOCALHOSTADMINID === principal) ||
    (process.env.NETWORK === "production" &&
      import.meta.env.VITE_APP_LIVENETWORKADMINID === principal)
  );
}
