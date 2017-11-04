<template>
  <div>
    <dfis-menu></dfis-menu>
    <dfis-title>
      <h1 slot="title_text">{{currentMenu}}</h1>
    </dfis-title>
    <router-view></router-view>
  </div>
</template>


<script>
  import dfisMenu from "../components/menu.vue";
  import dfisTitle from "../components/title.vue";
  import store from "../store"
  export default {
    name: 'home',
    data () {
      return {
        currentUploadUrl: "http://scmesos04/autotest/normalgroup/123.jgp",
        titleMenuMap:{'media_library':'Media Library','dashboard':'Dashboard','transformations':'Transformations'}
      };
    },
    components: {
      dfisMenu,
      dfisTitle,
    },
    methods: {
    },
    computed:{
        currentMenu(){
            return this.titleMenuMap[store.state.currentMenu];
        }
    }
  }
</script>
<style>
</style>
