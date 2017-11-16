const serverURI = 'http://st01nbx01/engine_api';
const dfisURI = 'http://scdfis01:8085/engine';
const userID='test';
const thumbnailSize = 'w_152,h_102,rx_line/';

export default {
  DirectoryUrl: `${serverURI}/directory/`,
  FileUrl: `${serverURI}/file/`,
  DFISThumbnailUrl:`${dfisURI}/${userID}/upload/${thumbnailSize}`,
  DFISUrl:`${dfisURI}/${userID}/upload/`
}
