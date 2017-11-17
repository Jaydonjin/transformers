<template>
  <div class="dfis_menu">
    <div class="transformer_menu">
      <Menu mode="horizontal" :theme="theme1" :active-name="activeName" @on-select="currentMenuName">
        <!--<MenuItem name="dashboard">-->
        <!--<Icon type="ios-paper"></Icon>-->
        <!--Dashboard-->
        <!--</MenuItem>-->
        <MenuItem name="media_library">
          <Icon type="images"></Icon>
          <b>Media Library</b>
        </MenuItem>
        <MenuItem name="transformations">
          <Icon type="settings"></Icon>
          <b>Transformations</b>
        </MenuItem>
        <MenuItem name="user" style="float: right;padding-top:10px;height: 50px">
          <Dropdown trigger="custom" placement="bottom-end" :visible="visible">
            <a href="javascript:void(0)" @click="handleOpen">
              <Avatar :src="currentUser.Avatar"/>
            </a>
            <DropdownMenu slot="list">
              <div>
                <DropdownItem>{{currentUser.DisplayName}}</DropdownItem>
                <div class="user_item_close">
                  <Button type="primary" @click="handleClose()" size="small">Cancel</Button>
                  <Button type="error" @click="logout()" size="small">Logout</Button>
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
  import {mapGetters, mapActions} from 'vuex'
  import store from '../store'
  export default {
    name: 'dfisMenu',
    data () {
      return {
        theme1: 'dark',
        visible: false,
        toolBar: ['user']
      }
    },
    methods: {
      ...mapActions(['logout']),
      handleOpen () {
        this.visible = !this.visible;
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
      ...mapGetters([
        'currentUser'
      ]),
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
    height: 50px;
    line-height: 50px;
  }

  .ivu-menu-item:hover {
    color: #fff;
    background: linear-gradient(to bottom, #0754ad 0%, #133762 100%)
  }

  .ivu-menu-item {
    padding: 0 10px;
    margin: 0 10px;
  }
</style>
