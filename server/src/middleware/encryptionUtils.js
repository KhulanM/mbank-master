const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = "YourEncryptionKey";

const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    ENCRYPTION_KEY
  ).toString();
  return encryptedData;
};

const decryptData = (encryptedData) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

module.exports = { encryptData, decryptData };
