class ToolService{
  static formatNodeTree(metaTree){
    if(!metaTree){
      return []
    }
    let length = metaTree.length;
    let result=[];
    while (length --){
      let node = metaTree[length];
      if(node.IsDirectory){
        node['title']=node.Name;
        node['loading']=false;
        node['children']=[];
        result.push(node)
      }
    }
    return result
  }

}

export default ToolService
