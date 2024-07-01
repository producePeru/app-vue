import CryptoJS from 'crypto-js';


const dToken = 
CryptoJS.AES.decrypt(encryptToken, 'appToken').toString(CryptoJS.enc.Utf8);

const dProfile = 
CryptoJS.AES.decrypt(encryptProfile, 'appProfile').toString(CryptoJS.enc.Utf8);

const dRole = 
CryptoJS.AES.decrypt(encryptRole, 'appRole').toString(CryptoJS.enc.Utf8);

const dEmail = 
CryptoJS.AES.decrypt(encryptEmail, 'appEmail').toString(CryptoJS.enc.Utf8);

const dViews = 
CryptoJS.AES.decrypt(encryptedLocalStore, 'appViews').toString(CryptoJS.enc.Utf8);

export {
  dToken, dProfile, dRole, dEmail, dViews
}