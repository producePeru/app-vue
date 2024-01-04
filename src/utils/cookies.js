import Cookies from 'js-cookie';

const userId = Cookies.get('user');
const userRole = Cookies.get('role');
const token = Cookies.get('token');

export { token, userId, userRole }