<template>
  <div class="folder_style">
    <Row class="folder_title">
      <Col span="18">
      <div v-if="!currentSelectFiles.length" style="position: absolute;z-index: 7">
        <Breadcrumb style="display: inline-block">
          <BreadcrumbItem><span><a @click="on_home()">Home</a></span></BreadcrumbItem>
          <BreadcrumbItem v-for="(folder,index) in folder_directory" :key="index"><span><a
            @click="on_breadCrumb(index)">{{folder}}</a></span>
          </BreadcrumbItem>
        </Breadcrumb>
        <span style="padding-left: 10px" v-if="folder_directory.length && noSubTree"><a
          @click="delete_folder_modal = true"><Icon type="trash-a"></Icon></a></span>
      </div>
      <transition name="slide-fade">
        <div v-if="currentSelectFiles.length" style="position: absolute;z-index: 7">
          <action-tabs :currentSubTree="currentSubTree" @modalDisplay="handleModalDisplay"></action-tabs>
        </div>
      </transition>
      </Col>

      <Col v-if="!currentSelectFiles.length" span="6" style="padding-left: 10px;float: right;">
      <Input v-model="new_folder_name" placeholder="Folder name" size="small" @on-enter="on_create_folder" style="width:60%;"></Input>
      <Button size="small" type="ghost" @click="on_create_folder">Create</Button>
      </Col>
    </Row>
    <div>
      <folder-directory ref="folderDirectory" @currentTree="handleCurrentTree"  @modalDisplay="handleModalDisplay"></folder-directory>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Modal v-model="delete_folder_modal" width="340">
      <p slot="header" style="color:#f60;text-align:center;margin-bottom: 0rem">
        <Icon type="information-circled"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align:center;font-size: 13px">
        <p>Are you sure you want to delete the selected image?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="on_delete_empty_folder()">Delete
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import folderDirectory from './folder-directory.vue'
  import actionTabs from './action-tabs.vue'
  import store from '../../../store'
  import {directoryService} from '../../../services'
  export default{
    name: 'folder',
    components: {folderDirectory, actionTabs},
    data(){
      return {
        new_folder_name: '',
        spinShow: false,
        currentSubTree: [],
        delete_folder_modal: false,
        modal_loading: false,
        folder_directory:[]
      }
    },
    methods: {
      on_create_folder(){
        if (!this.new_folder_name.trim()) {
          this.$Message.warning({content: 'Folder name can not be empty !', duration: 3});
          return
        }
        this.spinShow = true;
        let pullPtah = this.currentDirectory == '' ? this.new_folder_name : `${this.currentDirectory}/${this.new_folder_name}`;
        directoryService.add_sub_folder(pullPtah)
          .then(response => {
            store.commit('changeCurrentDirectory', pullPtah);
            this.$refs.folderDirectory.get_tree(pullPtah);
            this.new_folder_name = '';
            this.spinShow = false;
          })
          .catch(response => {
            this.spinShow = false;
            let errMessage;
            if (response.status == 403) {
              errMessage = 'This folder already exists !'
            }
            this.$Message.error({content: errMessage, duration: 3});
          })
      },
      on_home(){
        let current_breadcrumb_pull_path = '';
        store.commit('changeCurrentDirectory', current_breadcrumb_pull_path);
        this.$refs.folderDirectory.get_tree(current_breadcrumb_pull_path)
      },
      on_delete_empty_folder(){
        console.log('debug on_delete_empty_folder')
        this.modal_loading = true;
        this.delete_folder_modal = false;
        directoryService.delete_sub_folder(this.currentDirectory)
          .then(response => {
            this.modal_loading = false;
            this.$Notice.success({
              title: 'Delete Success',
              desc: true ? '' : ''
            });
            let ParentIndex = this.folder_directory.length - 2;
            this.on_breadCrumb(ParentIndex)
          })
          .catch(response => {
            this.modal_loading = false;
            this.$Notice.error({
              title: 'Delete failed',
              desc: true ? '' : ''
            });
          })
      },
      on_breadCrumb(index){
        console.log('debug on_breadCrumb')
        let stopIndex = index + 1;
        if (stopIndex == this.folder_directory.length) {
          return
        }
        let current_Breadcrumb = this.folder_directory.splice(0, index + 1);
        let current_breadcrumb_pull_path = current_Breadcrumb.join('/');
        store.commit('changeCurrentDirectory', current_breadcrumb_pull_path);
        this.$refs.folderDirectory.get_tree(current_breadcrumb_pull_path)
      },
      handleCurrentTree(tree){
        this.currentSubTree = tree
      },
      handleModalDisplay(display){
          this.spinShow=display
      }
    },
    computed: {
      currentDirectory: function () {
        return store.state.currentDirectory
      },
      currentSelectFiles: function () {
        return store.state.currentSelectFiles
      },
      noSubTree: function () {
        return this.currentSubTree.length === 0
      }
    },
    watch:{
      currentDirectory:function () {
        let Breadcrumb = this.currentDirectory==''?[]:this.currentDirectory.split('/');
        store.commit('changeCurrentBreadcrumb', Breadcrumb);
        this.folder_directory=Breadcrumb
      }
    }
  }
</script>
