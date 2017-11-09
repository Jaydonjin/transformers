<template>
  <div class="media_library_style">
    <div class="upload_area">
    <Row>
      <Col span="24">
        <Windcharger :uploadUrl="currentUploadUrl" @completeFileList="completeFileList"></Windcharger>
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

  export default {
    name: 'media-library',
    data () {
      return {
        currentUploadUrl:"http://scmesos04/autotest/normalgroup/123.jgp",
        completeFileLists:[]
      };
    },
    components: {
      Windcharger,
      UltraMagnus
    },
    methods: {
      completeFileList(list){
        this.completeFileLists=list
        console.log(this.completeFileLists)
      }
    }
  }
</script>
<style>

</style>
