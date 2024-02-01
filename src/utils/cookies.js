import Cookies from 'js-cookie';

const userId = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).idUser;
const userRole = Cookies.get('role');
const token = Cookies.get('token');

export { token, userId, userRole }




// Cookies.get('user')



