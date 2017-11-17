<template>
  <div class="image_detail" v-if="current_img.FullName">
    <div class="area_image_display">
      <img class="area_image_display" :src="dfisThumbnailUrl+encodeURIComponent(current_img.FullName)">
    </div>
    <div class="area_image_detail">
      <div class="public_id">{{current_img.name}}</div>
      <div class="info">{{current_img.FullName}}, {{current_img.FullName}} {{current_img.FullName}}</div>
      <div class="upload_info">Uploaded 21 days ago</div>
      <div><a>Rename</a></div>
    </div>
    <div class="area_image_action">
      <Button>Default</Button>
      <Button type="error">Error</Button>
    </div>
  </div>
</template>
<script>
  import store from '@/store'
  import config from '@/config'
  export default{
    name: 'IronHide',
    data(){
      return {
        current_img: store.state.image.info,
        dfisThumbnailUrl: config.getDFISUrl(store.state.user.info.HashID, false)
      }
    }
  }
</script>
<style>

</style>
