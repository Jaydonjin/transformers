<template>
  <div class="media_library_style">
    <div class="upload_area">
      <Row>
        <Col span="24">
        <Windcharger :uploadUrl="currentUploadUrl"></Windcharger>
        </Col>
      </Row>
    </div>
    <div>
      <UltraMagnus></UltraMagnus>
    </div>
  </div>
</template>


<script>
  import Windcharger from "./component/upload.vue";
  import UltraMagnus from "./component/folder.vue";
  import config from "../../config"
  import store from "../../store"

  export default {
    name: 'media-library',
    data () {
      return {
      };
    },
    components: {
      Windcharger,
      UltraMagnus
    },
    methods: {
      completeFileList(list){
        this.completeFileLists=list;
        console.log(this.completeFileLists)
      }
    },
    computed:{
      currentDirectory:function () {
        return store.state.currentDirectory
      },
      currentUploadUrl:function () {
        return `${config.FileUrl}${this.currentDirectory}`
      }
    }
  }
</script>
<style>

</style>
