<template>
  <div v-if="current_img.name">
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
  div.area_image_display {
    display: inline-block;
    padding-top: 10px;
    padding-left: 21px;
  }

  div.area_image_detail {
    display: inline-block;
    vertical-align: top;
    padding-top: 10px;
    padding-left: 10px;
  }

  img.area_image_display {
    max-height: 95px;
    border: 1px solid #b4bfcd;
  }

  .public_id {
    color: #444;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 4px;
    margin-top: 0;
    max-width: 480px;
    overflow: hidden;
    word-wrap: break-word;
  }

  .area_image_detail .info {
    color: #999;
    font-size: 12px;
  }

  .area_image_detail .upload_info {
    color: #999;
    font-size: 12px;
  }

</style>
