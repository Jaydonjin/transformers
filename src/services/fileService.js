/**
 * Created by jj51 on 2017/11/14.
 */
import {ajax} from "../ajax"
import config from '../config'

class FileService {
  static delete_file(fullPath) {
    return ajax.request('delete', `${config.FileUrl}${fullPath}`);
  }

  static move_file(fullPath, newFullPath) {
    let entity = {DstFullName: newFullPath};
    return ajax.request('put', `${config.FileUrl}${fullPath}`, entity);
  }

  static delete_files(parentPath, fullPathList) {
    let length = fullPathList.length;
    let Promise_Array = [];
    while (length--) {
      let fileFullPath = parentPath == '' ? fullPathList[length] : `${parentPath}/${fullPathList[length]}`;
      Promise_Array.push(this.delete_file(encodeURIComponent(fileFullPath)))
    }
    return ajax.requestAll(Promise_Array)
  }

  static move_files(parentPath, fullPathList, newPath) {
    let length = fullPathList.length;
    let Promise_Array = [];
    while (length--) {
      let fileFullPath =  parentPath == '' ? fullPathList[length] : `${parentPath}/${fullPathList[length]}`;
      let newFullPath =  newPath == '' ? fullPathList[length] : `${newPath}/${fullPathList[length]}`;
      console.log(fileFullPath);
      Promise_Array.push(this.move_file(fileFullPath, newFullPath))
    }
    console.log('Promise_Array', Promise_Array);
    return ajax.requestAll(Promise_Array)
  }
}

export default FileService
