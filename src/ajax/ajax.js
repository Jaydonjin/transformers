import axios from 'axios'
import config from '../config'
import iView from 'iview';

export default {
  request (method, url, data = null, headers) {
    iView.LoadingBar.start();
    if (!method) {
      console.error('API function call requires method argument');
      return
    }
    if (!url) {
      console.error('API function call requires uri argument');
      return
    }
    return axios({method, url, data, headers})
      .then(res => {
        iView.LoadingBar.finish();
        return res
      })
      .catch(err => {
          iView.LoadingBar.error();
          return Promise.reject(err.response);
        }
      )
  },


}
