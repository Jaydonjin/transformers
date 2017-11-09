<style lang="less">
  @import "../style/main.less";
</style>
<template>
  <div class="dfis_menu">
    <div class="transformer_menu">
      <Menu mode="horizontal" :theme="theme1" :active-name="activeName" @on-select="currentMenuName">
        <MenuItem name="dashboard">
          <Icon type="ios-paper"></Icon>
          Dashboard
        </MenuItem>
        <MenuItem name="media_library">
          <Icon type="images"></Icon>
          Media Library
        </MenuItem>
        <MenuItem name="transformations">
          <Icon type="settings"></Icon>
          Transformations
        </MenuItem>
        <MenuItem name="user" style="float: right;padding-top: 2px">
          <Dropdown trigger="custom" placement="bottom-end" :visible="visible">
            <a href="javascript:void(0)" @click="handleOpen">
              <Avatar icon="person"/>
            </a>
            <DropdownMenu slot="list">
              <div>
                <DropdownItem>Jaydon.T.Jin</DropdownItem>
                <div class="user_item_close">
                  <Button type="primary" @click="handleClose" size="small">关闭</Button>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>

<script>
  import router from '../router/index'
  import store from '../store'
  export default {
    name: 'dfisMenu',
    data () {
      return {
        theme1: 'dark',
        visible: false,
        toolBar: ['user'],
      }
    },
    methods: {
      handleOpen () {
        this.visible = true;
      },
      handleClose () {
        this.visible = false;
      },
      currentMenuName(name){
        if (this.toolBar.indexOf(name) == -1) {
          router.push(name);
          this.$emit('menuChange', name)
        }
      }
    },
    computed: {
      activeName(){
        return store.state.currentMenu
      }
    }

  }
</script>
<style>
  .ivu-menu-dark {
    background: #0e2f5a;
  }

  .ivu-menu-horizontal {
    height: 40px;
    line-height: 40px;
  }
</style>
