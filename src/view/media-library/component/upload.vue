<template>
  <div>
    <div class="panel">
      <h2>
        Upload Images
      </h2>
    </div>
    <DFISIvewUpload
      multiple
      type="drag"
      :action="uploadUrl"
      :on-success="uploadSuccess"
      :on-preview="on_preview"
      :show-upload-list="true"
      :default-file-list="completeFileList"
      ref="uploads">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Drop files here or select file</p>
      </div>
    </DFISIvewUpload>
  </div>
</template>

<script>
  import DFISIvewUpload from '../../../ivewModule/components/upload/upload.vue'
  export default {
    name: 'Windcharger',
    components:{
      DFISIvewUpload
    },
    props:{
      uploadUrl:{type:[String]}
    },
    data(){
        return {
          completeFileList:[]
        }
  },
    methods:{
      uploadSuccess(response, file, fileList){
        this.$Notice.success({
          title: 'Success',
          desc: true ? '' : ''
        });
        console.log(this.completeFileList)
        this.$emit('completeFileList', this.completeFileList)
      },
      on_preview(file){
          console.log(file)
      },
      on_clearFiles(){
          this.$refs.uploads.clearFiles();
      }
    }
  }
</script>
<style>
  .panel{
    padding: 10px;
  }
  .panel h2 {
    font-size: 22px;
    line-height: 28px;
    color: #426188;
    margin-bottom: 10px;
  }
  .list_title{
    padding-top: 10px;
    color: #888;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 15px;
    font-weight: normal;
    margin: 0 0 15px 0;
    display: block;
    min-width: 350px;
  }
  .list_title .clean_files{
    padding-top: 1px;
    position: absolute;
  }
</style>

