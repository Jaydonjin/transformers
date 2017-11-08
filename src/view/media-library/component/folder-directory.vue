<template>
  <div style="padding: 5px 5px 5px 20px">
    <a v-for="item in current_directory" key="item" v-if="item.isDirectory" class="directory_item">
      <Icon type="folder" size="40"></Icon>
      <Tooltip :content="item.name" placement="bottom-start"><span class="x-folder-item-title">{{item.name}}</span>
      </Tooltip>
    </a>
    <div style="margin-bottom: 50px"></div>
    <a v-for="item in current_directory" key="item" v-if="!item.isDirectory" class="img_item"
       @click="on_transform_img(item)">
      <span class="directory_item_img">
      <img :src="item.detail.url">
      </span>
      <div class="img_item_detail"><span>{{item.name}}</span></div>
    </a>
  </div>
</template>

<script>
  import store from '../../../store'
  import route from '../../../router'
  export default{
    name: 'Bumblebee',
    data(){
      return {
        current_directory: [
          {'name': 'testtetesttetesttetesttetestte', 'isDirectory': true},
          {'name': 'test', 'isDirectory': true},
          {'name': 'test', 'isDirectory': true},
          {
            'name': 'test.jpg',
            'isFolder': false,
            'detail': {
              'url': 'http://scmesos04/autotest/normalgroup/monitor.jpg',
              'size': '418KB',
              'type': 'JPG',
              'ratio': '1920x1080'
            }
          },
          {
            'name': 'adasd123123asdasda.jpg',
            'isFolder': false,
            'detail': {
              'url': 'http://scmesos04/autotest/normalgroup/adasd123123asdasda.jpg',
              'size': '418KB',
              'type': 'JPG',
              'ratio': '1920x1080'
            }
          },
          {
            'name': 'ffffffffffffffqqqqqqqqqqqqqqqqqqwwddddddwa.jpg',
            'isFolder': false,
            'detail': {
              'url': 'http://scmesos04/autotest/normalgroup/ffffffffffffffqqqqqqqqqqqqqqqqqqwwddddddwa.jpg',
              'size': '418KB',
              'type': 'JPG',
              'ratio': '1920x1080'
            }
          },
          {
            'name': 'ffffffffffffffqqqqqqqqqqqqqqqqqqwwddddddwa.jpg',
            'isFolder': false,
            'detail': {
              'url': 'https://res.cloudinary.com/dgvxg1d2d/image/upload/t_media_lib_thumb/v1510127961/Capture_n0ih73.png',
              'size': '418KB',
              'type': 'JPG',
              'ratio': '1920x1080'
            }
          }
        ]
      }
    },
    methods: {
      on_transform_img(img){
        store.commit('changeCurrentImg', img);
        store.commit('changeCurrentMenu', 'transformations');
        route.push('transformations')
      }
    }
  }
</script>
<style>
  .directory_item {
    padding: 5px 5px 0px 5px;
    width: 80px;
  }

  .img_item_detail {
    /*text-align: center;*/
    color: #444;
    padding-left: 5px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    max-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    position: relative;
    top: 1px;
  }

  .img_item {
    max-width: 150px;
    margin-right: 20px;
    margin-bottom: 20px;
    /*text-align: center;*/
    overflow: hidden;
    display: inline-block;

  }

  .x-folder-item-title {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .directory_item_img {
    width: 150px;
    height: 100px;
    margin: 5px 5px 6px;
    display: block;
  }

  .directory_item_img img {
    max-width: 140px;
    max-height: 100px;
    background: white;
    border: 1px solid #b4bfcd;
    -moz-box-shadow: 1px 1px 4px #ccc;
    -webkit-box-shadow: 1px 1px 4px #ccc;
    box-shadow: 1px 1px 4px #ccc;
  }
</style>
