<template>
  <div role="tablist">
   <b-btn role="tab" v-b-toggle.move_tab variant ="primary" size="sm"><Icon type="android-folder-open"></Icon></b-btn>
   <b-btn role="tab" v-b-toggle.trash_tab variant ="primary" size="sm"><Icon type="trash-a"></Icon></b-btn>
    <span class="image-selected-text"><span>{{currentSelectFiles.length}}</span> image selected <a>(clear)</a></span>
    <b-collapse role="tabpanel" accordion="my-accordion" id="move_tab" class="mt-2">
      <b-card bg-variant="primary"
              text-variant="white"
              class="text-center">
        <Row>
          <Col span="15">
        <Input v-model="move_path" size="small"></Input>
          </Col>
          <Col span="9">
        <b-button size="sm" style="font-size: 10px" href="#">Move this folder</b-button>
          </Col>
        </Row>
        <Row>
          <Col span="24" style="padding: 5px; border-bottom: 1px dashed #aaa;">
          <div style="float:left;">
            <span><Icon type="ios-home-outline" size="20"></Icon></span>
            <span>{{move_path}}</span>
          </div>
          </Col>
        </Row>
        <Row>
          <div style="float: left;text-align: left;color: white">
          <Tree :data="currentSubTreeFormat" :load-data="loadDirectory"></Tree>
          </div>
        </Row>
      </b-card>
    </b-collapse>
    <b-collapse role="tabpanel" accordion="my-accordion" id="trash_tab" class="mt-2">
      23
    </b-collapse>
  </div>
</template>
<script>
  import store from '../../../store'
  import {directoryService,toolService} from '../../../services'

  export default{
      name:'actionTabs',
      props:{
        currentSubTree:{type: [Array]},
        currentFullPath:{type:[String]}
      },
      data(){
          return{
          }
      },
      methods:{
        loadDirectory:function (item,callback) {
            console.log('debug')
            directoryService.get_sub_tree(`/${item.FullName}`)
              .then(response =>{
                let data = toolService.formatNodeTree(response.data)
                console.log(data)
                callback (data)
              })
        },
      },
      computed:{
        currentSubTreeFormat:function () {
          console.log(this.currentSubTree);
          let formatTree = toolService.formatNodeTree(this.currentSubTree);
          console.log('formatTree',formatTree);
          return formatTree
        },
        currentSelectFiles:function () {
         return store.state.currentSelectFiles
        },
        move_path:function () {
          return this.currentFullPath
        }
      },
  }
</script>
<style>
  .ivu-tree-title {
    display: inline-block;
    margin: 0;
    padding: 0 4px;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: top;
    color: white;
    transition: all .2s ease-in-out;
  }
  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.5rem;
  }
  .image-selected-text{
    margin-left: 10px;
    font-size: 10px
  }
</style>
