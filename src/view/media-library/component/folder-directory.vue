<template>
  <div class="folder_directory_style" style="padding: 5px 5px 5px 20px">
    <a v-for="(item,index) in currentTree" :key="index" v-if="item.IsDirectory" @click="on_folder(item.Name)"
       class="directory_item">
      <Icon type="folder" size="40"></Icon>
      <Tooltip :content="item.Name" placement="bottom-start"><span class="x-folder-item-title">{{item.Name}}</span>
      </Tooltip>
    </a>
    <div style="margin-bottom: 50px"></div>
    <CheckboxGroup v-model="currentSelectFiles">
    <a v-for="(item,index) in currentTree" :key="index" v-if="!item.IsDirectory" class="img_item">
      <span class="directory_item_img" @click="on_transform_img(item)">
      <img :src="item.url" >
      </span>
      <div class="img_item_detail"><span><Checkbox :label="item.Name"></Checkbox></span></div>
    </a>
    </CheckboxGroup>
  </div>
</template>

<script>
  import bus from './bus'
  import store from '../../../store'
  import route from '../../../router'
  import {directoryService} from '../../../services'

  export default{
    name: 'Bumblebee',
    data(){
      return {
        currentTree: [],
        waiting: false,
        currentSelectFiles:[]
      }
    },
    methods: {
      get_tree(pullPath){
        directoryService.get_sub_tree(pullPath)
          .then(response => {
            if (response.data) {
              this.currentTree = response.data;
              this.$emit('currentTree',this.currentTree);
              this.waiting = false
            }
          })
          .catch(response => {
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
        let currentDirectory = `${this.currentDirectory}/${folderName}`;
        store.commit('changeCurrentDirectory', currentDirectory);
        this.get_tree(this.currentDirectory);
      }
    },
    mounted(){
      this.get_tree(this.currentDirectory)
    },
    computed: {
      currentDirectory: function () {
        return store.state.currentDirectory
      }
    },
    watch: {
      currentSelectFiles:function (val) {
          store.commit("changeCurrentSelectFiles",val)
      }
    },
    created(){
      bus.$on('fileUploaded', function () {
        this.get_tree(this.currentDirectory);
      })
    }
  }
</script>
<style>

</style>
