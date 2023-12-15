// userData.js

const userStorage = localStorage.getItem('user');
let idUserStorage = null

if(userStorage) {
  console.log("jsjjsjsj");
  idUserStorage = JSON.parse(userStorage).id
}

export default idUserStorage;
