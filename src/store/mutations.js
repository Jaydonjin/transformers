export default {
  changeCurrentMenu(state, newMenu){
    state.currentMenu = newMenu
  },
  // changeCurrentImg(state, newImg){
  //   state.currentImg = newImg
  // },
  changeCurrentDirectory(state, newDirectory){
    state.currentDirectory = newDirectory
  },
  changeCurrentSelectFiles(state, newFiles){
    state.currentSelectFiles = newFiles
  },
  changeCurrentBreadcrumb(state, newValue){
    state.currentBreadcrumb = newValue
  },
  changeImageUpload(state){
    state.imageUpload = !state.imageUpload
  },
  changeImageDeleted(state){
    state.imageDeleted = !state.imageDeleted
  },
  changeImageMove(state){
    state.imageMove = !state.imageMove
  },
  changeImageMovePath(state, newPath){
    state.imageMovePath = newPath
  }
}
