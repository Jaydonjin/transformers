<style lang="less">
  @import "../../../style/main.less";
</style>
<template>
  <div class="upload_style">
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
        this.$emit('completeFileList', this.completeFileList)
      },
      on_preview(file){
      },
      on_clearFiles(){
          this.$refs.uploads.clearFiles();
      }
    }
  }
</script>

