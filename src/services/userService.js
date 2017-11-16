import queryString from 'query-string'
import { session } from '@/common'
import store from '@/store'
import {ajax} from '@/ajax'
import config from '@/config'

export default {
  logout () {
    session.delete('transformers_isLogin');
    location.href = 'https://account.newegg.org/logout?redirect_url=' + location.protocol + location.host + location.pathname
  },
  login(token){
    let header =  {"Authorization":`bearer ${token}`};
    return ajax.request('get',config.UserUrl,null,header)
      .then(res =>{
        if (res.status === 200) {
          return Promise.resolve({token: token, userInfo: res.data})
        }
      });
  },
  authorize (to, from) {
    const parsed = queryString.parse(location.search);
    let token = parsed['t'];
    if (token) {
      return this.login(token)
    } else {
      let url = 'https://account.newegg.org/login?redirect_url=' + location.href;
      location.href = url;
      return Promise.reject({userInfo: undefined})
    }
  },
};
