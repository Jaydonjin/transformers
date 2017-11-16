const serverURI = 'http://st01nbx01/engine_api';
// const serverURI = 'http://wcmis035:8080/engine_api';
const dfisURI = 'http://scdfis01:8085/engine';
const thumbnailSize = 'w_152,h_102,rx_line/';
export default {
  DirectoryUrl: `${serverURI}/directory/`,
  FileUrl: `${serverURI}/file/`,
  UserUrl:`${serverURI}/user`,
  getDFISUrl:function (hashID,isThumbnail) {
    return  isThumbnail ?`${dfisURI}/${hashID}/upload/${thumbnailSize}`:`${dfisURI}/${hashID}/upload/`
  }
}

