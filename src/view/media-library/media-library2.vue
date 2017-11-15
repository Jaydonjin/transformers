<template>
  <div class="media_library_style">
    <div class="upload_area">
      <Row>
        <Col span="24">
        <dfis-upload :uploadUrl="currentUploadUrl"></dfis-upload>
        </Col>
      </Row>
    </div>
    <div>
      <folder></folder>
    </div>
  </div>
</template>


<script>
  import dfisUpload from "./component/upload.vue";
  import folder from "./component/folder.vue";
  import config from "../../config"
  import store from "../../store"

  export default {
    name: 'media-library',
    data () {
      return {};
    },
    components: {
      dfisUpload,
      folder
    },
    methods: {
      completeFileList(list){
        this.completeFileLists = list;
        console.log(this.completeFileLists)
      }
    },
    computed: {
      currentDirectory: function () {
        return store.state.currentDirectory
      },
      currentUploadUrl: function () {
        return this.currentDirectory==''?config.FileUrl:`${config.FileUrl}${this.currentDirectory}/`
      }
    }
  }
</script>
<style>

</style>
