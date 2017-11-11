import {ajax} from "../ajax"
import config from '../config'

class DirectoryService {
  static get_sub_tree(directory){
    return ajax.request('get',`${config.DirectoryUrl}${directory}`);
  }
  static add_sub_folder(pullPath){
    return ajax.request('post',`${config.DirectoryUrl}${pullPath}`);
  }
  static delete_sub_folder(pullPath){
    return ajax.request('delete',`${config.DirectoryUrl}${pullPath}`);
  }
}

export default DirectoryService
