import axios from 'axios'
import iView from 'iview';
import {session} from '@/common'

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
    let token = session.get('transformers_token');
    let defaultHeader = {"Authorization": `bearer ${token}`};
    let header = headers ? headers : defaultHeader;
    return axios({method, url, data, headers: header})
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
  requestAll(requestList){
    return axios.all(requestList)
      .then(res => {
        iView.LoadingBar.finish();
        return res
      })
      .catch(err => {
        iView.LoadingBar.error();
        return Promise.reject(err);
      })
  }


}
