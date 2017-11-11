export default {
  changeCurrentMenu(state, newMenu){
    state.currentMenu = newMenu
  },
  changeCurrentImg(state, newImg){
    state.currentImg = newImg
  },
  changeCurrentDirectory(state,newDirectory){
    state.currentDirectory = newDirectory
  },
  changeCurrentSelectFiles(state,newFiles){
    state.currentSelectFiles=newFiles
  }
}
