<template>
  <div role="tablist" class="action_tabs_style">
    <b-btn role="tab" v-b-toggle.move_tab variant="primary" size="sm">
      <Icon type="android-folder-open"></Icon>
    </b-btn>
    <b-btn role="tab" @click="on_download_files()" variant="primary" size="sm">
      <Icon type="ios-cloud-download-outline"></Icon>
    </b-btn>
    <b-btn role="tab" @click="delete_file_modal= true" variant="primary" size="sm">
      <Icon type="trash-a"></Icon>
    </b-btn>
    <span class="image-selected-text"><span>{{currentSelectFiles.length}}</span> image selected <a
      @click="on_clear_select()">(clear)</a></span>
    <b-collapse role="tabpanel" accordion="my-accordion" id="move_tab" class="mt-2">
      <b-card bg-variant="primary"
              text-variant="white"
              class="text-center">
        <Row>
          <Col span="15">
          <Input v-model="move_path" class="move_path_style" size="small"></Input>
          </Col>
          <Col span="9">
          <b-button size="sm" style="font-size: 10px;background-color: #004069" @click="on_move_files()">Move
            this folder
          </b-button>
          </Col>
        </Row>
        <Row>
          <Col span="24" style="padding: 5px; border-bottom: 1px dashed #aaa;">
          <div style="float:left;">
            <span style="cursor: pointer" @click="on_home()"><Icon type="ios-home-outline" size="20"></Icon></span>
            <span v-for="(subPath,index) in fullPath" key="subPath" style="cursor: pointer" @click="on_bread(index)"> /{{subPath}}</span>
          </div>
          </Col>
        </Row>
        <Row>
          <div style="float: left;text-align: left;color: white">
            <ul>
              <li v-for="item in subTreeFormat" key="item.Name" style="cursor: pointer" @click="on_loadDirectory(item)">
                {{item.Name}}
              </li>
            </ul>
          </div>
        </Row>
      </b-card>
    </b-collapse>
    <Modal v-model="delete_file_modal" width="340">
      <p slot="header" style="color:#f60;text-align:center;margin-bottom: 0rem">
        <Icon type="information-circled"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align:center;font-size: 13px">
        <p>Are you sure you want to delete the selected image?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="on_del_files()">Delete</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import store from '@/store'
  import config from '@/config'
  import {directoryService, fileService, toolService} from '@/services'
  import bus from'./bus'

  export default{
    name: 'actionTabs',
    props: {
      currentSubTree: {type: [Array]},
    },
    data(){
      return {
        subTree: this.currentSubTree,
        fullPath: [],
        delete_file_modal: false,
        modal_loading: false,
        dfisUrl: config.getDFISUrl(store.state.user.info.HashID, false)
      }
    },
    methods: {
      on_loadDirectory: function (item) {
        this.subTree = [];
        directoryService.get_sub_tree(`${item.FullName}`)
          .then(response => {
            this.subTree = response.data;
            this.fullPath.push(item.Name)
            console.log('test1', this.fullPath)
            console.log('test2', store.state.currentBreadcrumb)
          })
      },
      on_bread(index){
        let stopIndex2 = index + 1;
        if (stopIndex2 == this.fullPath.length) {
          return
        }
        let current_Bread = this.fullPath.splice(0, index + 1);
        this.fullPath = current_Bread;
        let current_bread_pull_path = current_Bread.join('/');
        directoryService.get_sub_tree(`${current_bread_pull_path}`)
          .then(response => {
            this.subTree = response.data;
            this.fullPath = current_Bread;
          })
      },
      on_home(){
        directoryService.get_sub_tree(``)
          .then(response => {
            this.subTree = response.data;
            this.fullPath = []
          })
      },
      on_move_files(){
        this.$emit('modalDisplay', true);
        let parentPath = store.state.currentBreadcrumb.join('/');
        fileService.move_files(parentPath, this.currentSelectFiles, this.move_path)
          .then(res => {
            this.$Notice.success({
              title: 'Move Success',
              desc: true ? '' : ''
            });
            store.commit('changeImageMove');
            store.commit('changeImageMovePath', this.move_path);
          })
          .catch(err => {
            store.commit('changeImageMove');
            store.commit('changeImageMovePath', this.move_path);
            let noticeDesc = err.data.message;
            this.$Notice.error({
              title: 'Move Failed',
              desc: false ? '' : noticeDesc,
              duration: 8
            });
          })
      },
      on_clear_select(){
        store.commit('changeCurrentSelectFiles', []);
      },
      on_del_files(){
        this.modal_loading = true;
        let parentPath = store.state.currentBreadcrumb.join('/');
        fileService.delete_files(parentPath, this.currentSelectFiles)
          .then(res => {
            store.commit('changeImageDeleted')
            this.modal_loading = false;
            this.delete_file_modal = false;
            console.log('all', res)
          })
          .catch(err => {
            store.commit('changeImageDeleted')
            this.modal_loading = false;
            this.delete_file_modal = false;
            console.log('allERR', err)
          })
      },
      on_download_files(){
        let parentPath = store.state.currentBreadcrumb.join('/');
        this.currentSelectFiles.map(function (file, index, array) {
          console.log(this)
          let imageUrl = parentPath ? `${this.dfisUrl}${parentPath}/${file}` : `${this.dfisUrl}${file}`;
          debugger
          let a = document.createElement('a');
          let filename = file;
          a.href = imageUrl;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(imageUrl);
          let subArray = array.slice(index);
          array.length == index + 1 ? subArray = [] : '';
          store.commit('changeCurrentSelectFiles', subArray)
        }, this)
      }
    },
    computed: {
      currentSelectFiles: function () {
        return store.state.currentSelectFiles
      },
      subTreeFormat: function () {
        let formatTree = toolService.formatNodeTree(this.subTree);
        return formatTree
      },
      move_path: function () {
        return this.fullPath.join('/')
      }
    },
    mounted(){
      this.fullPath = [...store.state.currentBreadcrumb];
      console.log('mounted', this.fullPath)
    }
  }
</script>
<style>

</style>
