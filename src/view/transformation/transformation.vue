<style lang="less">
  @import "../../style/main.less";
</style>
<template>
  <div class="transform_view">
    <transition name="slide-left">
      <div class="image_detail_area">
        <IronHide></IronHide>
      </div>
    </transition>
    <div>
      <Brainstorm></Brainstorm>
    </div>
  </div>
</template>
<script>
  import IronHide from './component/image-detail.vue'
  import Brainstorm from './component/image-transform.vue'
  import store from '../../store'
  export default{
    name: "transformation",
    components: {IronHide, Brainstorm},
    data(){
      return {
        current_img: store.state.currentImg
      }
    }
  }
</script>
<style>

</style>
