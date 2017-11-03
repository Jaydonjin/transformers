<template>
  <div>
    <dfis-menu @menuChange="menuChanged" :activeName="currentActiveName"></dfis-menu>
    <dfis-title>
      <h1 slot="title_text">{{currentActiveName}}</h1>
    </dfis-title>
    <router-view></router-view>
  </div>
</template>


<script>
  import dfisMenu from "../components/menu.vue";
  import dfisTitle from "../components/title.vue";
  export default {
    name: 'home',
    data () {
      return {
        currentActiveName: 'Dashboard',
        currentUploadUrl: "http://scmesos04/autotest/normalgroup/123.jgp",
        completeFileLists: [],
        titleMenuMap:{'media_library':'Media Library','dashboard':'Dashboard','transformations':'Transformations'}
      };
    },
    components: {
      dfisMenu,
      dfisTitle,
    },
    methods: {
      menuChanged(name){
        this.currentActiveName = this.titleMenuMap[name];
      },
      completeFileList(list){
        this.completeFileLists = list;
      }
    }
  }
</script>
<style>
  .upload_area {
    padding: 0px 10px 10px 10px;
    border-top: 1px solid transparent;
    width: 100%;
    margin-bottom: 18px;
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
