<template>
  <div>
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
  .upload_area{
    height: 168px;
    padding: 0px 10px 10px 10px;
    border-top: 1px solid transparent;
    width: 100%;
    /*margin-bottom: 18px;*/
    -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .folder_area{
    min-height: 400px;
    padding: 0px 10px 10px 10px;
    border-top: 1px solid transparent;
    width: 100%;
    margin-bottom: 18px;
    -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    box-shadow: 0 -2px 4px rgba(0,0,0,0.2);
  }
</style>
