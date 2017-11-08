<template>
  <div class="folder_in_area">
    <Row class="folder_title">
      <Col span="19">
      <Breadcrumb style="display: inline-block">
        <BreadcrumbItem v-for="folder in folder_directory" :key="folder">{{folder}}</BreadcrumbItem>
      </Breadcrumb>
      <span style="padding-left: 10px" @click="on_delete_folder"><a><Icon type="trash-a"></Icon></a></span>
      </Col>
      <Col span="3">
      <Input v-model="new_folder_name" placeholder="Folder name" size="small" @on-enter="on_create_folder"></Input>
      </Col>
      <Col span="2" style="padding-left: 10px">
      <Button size="small" type="ghost" @click="on_create_folder">Create</Button>
      </Col>
    </Row>
    <div>
      <Bumblebee></Bumblebee>
    </div>
  </div>
</template>

<script>
  import Bumblebee from './folder-directory.vue'
  export default{
    name: 'UltraMagnus',
    components: {Bumblebee},
    data(){
      return {
        folder_directory: ['home', 'file'],
        new_folder_name: ''
      }
    },
    methods: {
      on_create_folder(){
        this.folder_directory.push(this.new_folder_name);
        this.new_folder_name = '';
      },
      on_delete_folder(){
        this.folder_directory.pop()
      }
    }
  }
</script>
<style>
  .folder_in_area .folder_title {
    padding: 10px;
    border-bottom: 1px dashed #aaa;
  }

</style>
