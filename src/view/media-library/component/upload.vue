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
      name="Attachment"
      :action="uploadUrl"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-preview="on_preview"
      :show-upload-list="true"
      ref="uploads">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Drop files here or select file</p>
      </div>
    </DFISIvewUpload>
  </div>
</template>

<script>
  import bus from'./bus'
  import store from '../../../store'
  import DFISIvewUpload from '../../../ivewModule/components/upload/upload.vue'
  export default {
    name: 'dfisUpload',
    components: {
      DFISIvewUpload
    },
    props: {
      uploadUrl: {type: [String]}
    },
    data(){
      return {}
    },
    methods: {
      uploadSuccess(response, file, fileList){
        this.$Notice.success({
          title: 'Upload Success',
          desc: true ? '' : ''
        });
        store.commit('changeImageUpload')
      },
      uploadError(response, file, fileList){
        this.$Notice.error({
          title: 'Upload Failed',
          desc: true ? '' : ''
        });
      },
      on_preview(file){
      },
      on_clearFiles(){
        this.$refs.uploads.clearFiles();
      }
    }
  }
</script>

