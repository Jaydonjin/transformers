<style lang="less">
  @import "../style/main.less";
</style>
<template>
  <div class="dfis">
    <div>
      <Menu mode="horizontal" :theme="theme1" :active-name="activeName" @on-select="currentMenuName">
        <MenuItem name="dashboard">
          <Icon type="ios-paper"></Icon>
          Dashboard
        </MenuItem>
        <MenuItem name="media_library">
          <Icon type="ios-people"></Icon>
          Media Library
        </MenuItem>
        <MenuItem name="transformations">
          <Icon type="settings"></Icon>
          Transformations
        </MenuItem>
        <MenuItem name="user" style="float: right;padding-top: 10px">
          <Dropdown trigger="custom" placement="bottom-end" :visible="visible">
            <a href="javascript:void(0)" @click="handleOpen">
              <Avatar icon="person"/>
            </a>
            <DropdownMenu slot="list">
              <div>
                <div style="padding: 0px 10px 0px 10px">
                  Jaydon.T.Jin
                </div>
                <div style="text-align: right;padding-right: 5px">
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
  export default {
    name: 'dfisMenu',
    data () {
      return {
        theme1: 'dark',
        visible: false,
        toolBar: ['user'],
      }
    },
    props: {
      activeName: {type: [String, Number]}
    },
    methods: {
      handleOpen () {
        this.visible = true;
      },
      handleClose () {
        this.visible = false;
      },
      currentMenuName(name){
        router.push(name);
        this.toolBar.indexOf(name) == -1 ? this.$emit('menuChange', name) : ''
      }
    },

  }
</script>
