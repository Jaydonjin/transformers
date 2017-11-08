<template>
  <div>
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
  .image_detail_area {
    height: 120px;
    padding: 0px 10px 10px 10px;
    border-top: 1px solid transparent;
    width: 100%;
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
