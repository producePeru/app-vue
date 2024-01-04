// userData.js

const userStorage = localStorage.getItem('user');
let idUserStorage = null

if(userStorage) {
  idUserStorage = JSON.parse(userStorage).id
}

export default idUserStorage;
