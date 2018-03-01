import Cookies from 'js-cookie';
import store from '@src/store';

export default logout => {
     document.getElementById('__header').style.display = 'none';
    // token
    store.dispatch('REMORETOKEN');
    Cookies.remove('token');
    // headerRouters
    Cookies.remove('headerRouters');
    // 回到登录
    location.reload();
}