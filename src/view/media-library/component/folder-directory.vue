<template>
  <div class="folder_directory_style" style="padding: 5px 5px 5px 20px">
    <a v-for="(item,index) in currentTree" :key="index" v-if="item.IsDirectory" @click="on_folder(item.Name)"
       class="directory_item">
      <Icon type="folder" size="40"></Icon>
      <Tooltip :content="item.Name" placement="bottom-start"><span class="x-folder-item-title">{{item.Name}}</span>
      </Tooltip>
    </a>
    <div style="margin-bottom: 50px"></div>
    <CheckboxGroup v-model="currentSelectFiles" @on-change="handleSelectFiles">
      <a v-for="(item,index) in currentTree" :key="index" v-if="!item.IsDirectory" class="img_item">
      <span class="directory_item_img" @click="on_transform_img(item)">
      <img :src="dfisURL+encodeURIComponent(item.FullName)">
      </span>
        <div class="img_item_detail"><span><Checkbox :label="item.Name"><span :title="item.Name">{{item.Name | truncate(20) }}</span></Checkbox></span></div>
      </a>
    </CheckboxGroup>
  </div>
</template>

<script>
  import bus from './bus'
  import store from '../../../store'
  import config from '../../../config'
  import route from '../../../router'
  import {directoryService} from '../../../services'

  export default{
    name: 'folderDirectory',
    data(){
      return {
        currentTree: [],
        waiting: false,
        dfisURL:config.DFISUrl
      }
    },
    methods: {
      get_tree(pullPath){
        directoryService.get_sub_tree(pullPath)
          .then(response => {
            if (response.data) {
              this.$emit('modalDisplay',false);
              this.currentTree = response.data;
              this.$emit('currentTree', this.currentTree);
              this.waiting = false;
              this.currentSelectFiles = []
            }
          })
          .catch(response => {
            this.$emit('modalDisplay',false);
            this.waiting = false
          })
      },
      on_transform_img(img){
        store.commit('changeCurrentImg', img);
        store.commit('changeCurrentMenu', 'transformations');
        route.push('transformations')
      },
      on_folder(folderName){
        if (this.waiting) {
          return
        }
        this.waiting = true;
        let currentDirectory = this.currentDirectory == '' ? folderName : `${this.currentDirectory}/${folderName}`;
        store.commit('changeCurrentDirectory', currentDirectory);
        this.get_tree(this.currentDirectory);
      },
      handleSelectFiles(event){
        console.log("handleSelectFiles", event)
      }
    },
    mounted(){
      this.get_tree(this.currentDirectory)
    },
    computed: {
      currentDirectory: function () {
        return store.state.currentDirectory
      },
      imageUpload: function () {
        return store.state.imageUpload
      },
      imageDelete: function () {
        return store.state.imageDeleted
      },
      imageMove: function () {
        return store.state.imageMove
      },
      imageMovePath: function () {
        return store.state.imageMovePath
      },
      currentSelectFiles: {
        get: function () {
          return store.state.currentSelectFiles
        },
        set: function (newValue) {
          store.commit("changeCurrentSelectFiles", newValue)
        }
      }
    },
    watch: {
      imageUpload: function () {
        this.get_tree(this.currentDirectory);
      },
      imageDelete: function () {
        this.get_tree(this.currentDirectory);
      },
      imageMove:function () {
        store.commit('changeCurrentDirectory', this.imageMovePath);
        this.get_tree(this.imageMovePath)
      }
    },
    created(){
    }
  }
</script>
<style>

</style>
