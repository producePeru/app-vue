import Cookies from 'js-cookie';

const userId = Cookies.get('usuario');

const rolex = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).rol;

const token = Cookies.get('token');

export { token, userId, rolex }
