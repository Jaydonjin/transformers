<template>
  <div class="folder_style">
    <Row class="folder_title">
      <Col span="19">
      <Breadcrumb style="display: inline-block">
        <BreadcrumbItem><span><a @click="on_home()">Home</a></span></BreadcrumbItem>
        <BreadcrumbItem v-for="(folder,index) in folder_directory" :key="index" ><span><a @click="on_breadCrumb(index)">{{folder}}</a></span></BreadcrumbItem>
      </Breadcrumb>
      <span style="padding-left: 10px" v-if="folder_directory.length"><a><Icon type="trash-a"></Icon></a></span>
      </Col>
      <Col span="3">
      <Input v-model="new_folder_name" placeholder="Folder name" size="small" @on-enter="on_create_folder"></Input>
      </Col>
      <Col span="2" style="padding-left: 10px">
      <Button size="small" type="ghost" @click="on_create_folder">Create</Button>
      </Col>
    </Row>
    <div>
      <Bumblebee ref="bumlebee"></Bumblebee>
    </div>
  </div>
</template>

<script>
  import Bumblebee from './folder-directory.vue'
  import store from '../../../store'
  import {directoryService} from '../../../services'
  export default{
    name: 'UltraMagnus',
    components: {Bumblebee},
    data(){
      return {
        new_folder_name: ''
      }
    },
    methods: {
      on_create_folder(){
        let pullPtah=`${this.currentDirectory}/${this.new_folder_name}`;
        directoryService.add_sub_folder(pullPtah)
          .then(response =>{
            store.commit('changeCurrentDirectory',pullPtah);
            this.$refs.bumlebee.get_tree(pullPtah);
            this.new_folder_name = '';
          });
      },
      on_home(){
        let current_breadcrumb_pull_path='';
        store.commit('changeCurrentDirectory',current_breadcrumb_pull_path);
        this.$refs.bumlebee.get_tree(current_breadcrumb_pull_path)
      },
      on_breadCrumb(index){
          let stopIndex = index+1;
          if(stopIndex==this.folder_directory.length){return}
          let current_Breadcrumb=this.folder_directory.splice(0,index+1);
          current_Breadcrumb.unshift('');
          let current_breadcrumb_pull_path=current_Breadcrumb.join('/');
          store.commit('changeCurrentDirectory',current_breadcrumb_pull_path);
          this.$refs.bumlebee.get_tree(current_breadcrumb_pull_path)
      }
    },
    computed:{
      currentDirectory:function () {
        return store.state.currentDirectory
      },
      folder_directory:function () {
        let Breadcrumb = this.currentDirectory.split('/');
        Breadcrumb.shift();
        return Breadcrumb
      }
  }
  }
</script>
