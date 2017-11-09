<style lang="less">
  @import "../../../style/main.less";
</style>
<template>
  <div class="image_detail" v-if="current_img.name">
    <div class="area_image_display">
      <img class="area_image_display" :src="current_img.detail.url">
    </div>
    <div class="area_image_detail">
      <div class="public_id">{{current_img.name}}</div>
      <div class="info">{{current_img.detail.ratio}}, {{current_img.detail.size}} {{current_img.detail.type}}</div>
      <div class="upload_info">Uploaded 21 days ago</div>
      <div><a>Rename</a></div>
    </div>
  </div>
</template>
<script>
  import store from '../../../store'
  export default{
    name: 'IronHide',
    data(){
      return {
        current_img: store.state.currentImg
      }
    }
  }
</script>
<style>

</style>
