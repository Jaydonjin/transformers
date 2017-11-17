<style lang="less">
  @import "../style/main.less";
</style>
<template>
  <div>
    <img
      src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMjg4IDM4NSAzNSAyMyI+PHN0eWxlPi5zdDB7ZmlsbDojRkFGQUZBO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMjU3LjggNDA3LjFjLS4xIDAtLjIuMS0uMy4xLS40IDAtLjktLjMtMS0uNy0uMi0uNi4xLTEuMi43LTEuMyAyLS43IDMuMy0yLjQgMy4zLTQuNSAwLTIuNi0yLjEtNC44LTQuOC00LjhoLS42bC0xIC4xLS4xLTFjLS42LTQuNS00LjUtNy44LTktNy44LTMuNyAwLTcgMi4yLTguNCA1LjdsLS4zLjZoLS43Yy0zLjIuMS01LjggMi43LTUuOCA1LjkgMCAyLjMgMS40IDQuNSAzLjUgNS41LjUuMi44LjkuNSAxLjQtLjIuNS0uOS44LTEuNC41LTIuOS0xLjMtNC43LTQuMi00LjctNy40IDAtNC4xIDMuMi03LjYgNy4yLTggMS45LTMuOSA1LjgtNi40IDEwLjEtNi40IDUuMiAwIDkuNyAzLjcgMTAuOSA4LjcgMy43LjEgNi44IDMuMSA2LjggNi45LS4xIDIuOS0yIDUuNi00LjkgNi41em0tMjAuMy0xMi40aC4ybDMuNCAyLjRjLjEgMCAuMS4xLjEuMnMtLjEuMi0uMi4yaC0uN3Y5LjRjMCAuNS40LjguOC44aC4xYy4xIDAgLjEuMS4xLjIgMCAwIDAgLjEtLjEuMUgtMjc5LjZjLS43IDAtMS4yLS41LTEuMi0xLjJ2LTkuNGgtLjdjLS4xIDAtLjEtLjEtLjItLjEgMC0uMSAwLS4yLjEtLjJsMy41LTIuNHptNy41IDIuMWguMmwzLjQgMi40Yy4xIDAgLjEuMS4xLjJzLS4xLjItLjIuMmgtLjd2Ny4zYzAgLjUuNC44LjguOGguMWMuMSAwIC4xLjEuMS4yIDAgMCAwIC4xLS4xLjFILTI3Mi4xYy0uNyAwLTEuMi0uNS0xLjItMS4ydi03LjNoLS43Yy0uMSAwLS4xLS4xLS4yLS4xIDAtLjEgMC0uMi4xLS4ybDMuNS0yLjR6bTcuNCAyLjFoLjJsMy40IDIuNGMuMSAwIC4xLjEuMS4ycy0uMS4yLS4yLjJoLS43djUuMmMwIC41LjQuOC44LjhoLjFjLjEgMCAuMS4xLjEuMiAwIDAgMCAuMS0uMS4xSC0yNjQuN2MtLjcgMC0xLjItLjUtMS4yLTEuMnYtNS4yaC0uN2MtLjEgMC0uMS0uMS0uMi0uMSAwLS4xIDAtLjIuMS0uMmwzLjUtMi40eiIvPjwvc3ZnPg=="
      class="transformers_icon">
    <dfis-menu style="padding-left: 50px"></dfis-menu>
    <div>
      <dfis-title>
        <h1 slot="title_text">{{currentMenu}}</h1>
      </dfis-title>
      <transition name="slide-left" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
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
        titleMenuMap: {'media_library': 'Media Library', 'dashboard': 'Dashboard', 'transformations': 'Transformations'}
      };
    },
    components: {
      dfisMenu,
      dfisTitle,
    },
    methods: {},
    computed: {
      currentMenu(){
        return this.titleMenuMap[store.state.currentMenu];
      }
    }
  }
</script>
<style>
  .transformers_icon {
    height: 50px;
    position: absolute;
    background-color: #0078ff;
  }
</style>
