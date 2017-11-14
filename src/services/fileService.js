/**
 * Created by jj51 on 2017/11/14.
 */
import {ajax} from "../ajax"
import config from '../config'

class FileService {
  static delete_file(pullPath){
    return ajax.request('delete',`${config.FileUrl}${pullPath}`);
  }
}

export default FileService
