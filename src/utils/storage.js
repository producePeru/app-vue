import CryptoJS from 'crypto-js';

const encryptToken = localStorage.getItem('eToken');
const encryptProfile = localStorage.getItem('eProfile');
const encryptRole = localStorage.getItem('eRole');
const encryptEmail = localStorage.getItem('eEmail');
const encryptedLocalStore = localStorage.getItem('views');

let dToken = null;
let dProfile = null;
let dRole = null;
let dEmail = null;
let dViews = null;

const decryptData = (encryptedData, key) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (decryptedString) {
      return JSON.parse(decryptedString);
    }
    return null;
  } catch (error) {
    console.error(`Error decrypting data with key ${key}:`, error);
    return null;
  }
};

if (encryptToken) {
  dToken = decryptData(encryptToken, 'appToken');
}

if (encryptProfile) {
  dProfile = decryptData(encryptProfile, 'appProfile');
}

if (encryptRole) {
  dRole = decryptData(encryptRole, 'appRole');
}

if (encryptEmail) {
  dEmail = decryptData(encryptEmail, 'appEmail');
}

if (encryptedLocalStore) {
  dViews = decryptData(encryptedLocalStore, 'appvistas');
}

export {
  dToken, dProfile, dRole, dEmail, dViews
};