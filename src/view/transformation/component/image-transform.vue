<template>
  <div class="transform_area">
    <Row>
      <Col :span="10" class="transform_option_area">
      <Form ref="transformOption" :model="transformOption" label-position="top">
        <h3>Resize & crop <a class="option_rest" @click="on_reset_option()">Reset</a></h3>
        <Row>
          <Col :span="8">
          <FormItem label="Width:" class="transform_option_item">
            <div slot="label">Width:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformOption.width" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Height:" class="transform_option_item">
            <div slot="label">Height:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformOption.height" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Mode:" class="transform_option_item">
            <div slot="label">Mode:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <div class="select_item">
              <Select v-model="transformOption.mode" size="small">
                <Option v-for="modeType in modes" :value="modeType" :key="modeType">{{ modeType }}</Option>
              </Select>
            </div>
          </FormItem>
          </Col>
        </Row>
        <h3>Format & shape</h3>
        <Row>
          <Col :span="8">
          <FormItem label="Format:" class="transform_option_item">
            <div class="select_item">
              <Select v-model="transformOption.format" size="small">
                <Option v-for="formatType in formatTypes" :value="formatType" :key="formatType">{{ formatType }}
                </Option>
              </Select>
            </div>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Quality:" class="transform_option_item">
            <div slot="label">Quality:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformOption.quality" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Rotation angle:" class="transform_option_item">
            <div slot="label">Rotation angle:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformOption.rotation" :min="0" :max="360" show-input></Slider>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
      <Col :span="14">
      <div class="transform_area_preview" style="min-height: 400px">
        <img class="transform_preview_img" :src="dfisUrl+encodeURIComponent(current_img.FullName)">
        <a class="transform_preview_full_image">
          <span><a :href="current_transform_url" target="_blank">View full-size image</a></span>
        </a>
        <div>
          <b-card no-body>
            <b-tabs small card >
              <b-tab title="URL">
                <code><a class="transform_sdk_url" :href="current_transform_url"
                         target="_blank">{{current_transform_url}}</a>
                  <span style="display: inline-block;margin-left: 10px" v-clipboard="current_transform_url"
                        @click="clipboardSuccess()">
                  <a><Icon size='25' type="ios-copy-outline"></Icon></a>
                </span>
                </code>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
      </Col>
    </Row>
    {{current_transform_url}}
  </div>
</template>
<script>
  import store from '@/store'
  import config from '@/config'
  export default{
    name: "Brainstorm",
    data(){
      return {
        current_img: store.state.image.info,
        transformOption: this.init_transform_option(),
        modes: ['Scale', 'Fill'],
        formatTypes: ['Keep format', 'JPG', 'PNG'],
        transformOptionChange: false,
        dfisUrl: config.getDFISUrl(store.state.user.info.HashID, false)

      }
    },
    methods: {
      init_transform_option(){
        return {width: 100, height: 100, mode: 'Scale', format: 'Keep format', quality: 100, rotation: 0}
      },
      on_reset_option(){
        this.transformOption = this.init_transform_option();
        this.transformOptionChange = false;
      },
      create_conditional(){
        console.log(this.transformOption.width);
        return this.transformOption.width
      },
      clipboardSuccess(e){
        this.$Message.success('Copied !')
      },
      clipboardError(){
        this.$Message.warning('Copy failed .')
      },
      format_transform_url(conditionals){
        let url = this.dfisUrl;
        let url_array = [];
        let img_name;
        if (url) {
          url_array = url.split('/');
          url_array.pop();
          img_name = encodeURIComponent(this.current_img.FullName);
          url_array.push(...conditionals);
          url_array.push(img_name)
        }
        return url_array
      }
    },
    watch: {
      transformOption: {
        handler: function () {
          this.transformOptionChange = true
        },
        deep: true
      }
    },
    computed: {
      current_transform_url: function () {
        let conditionals = [];
        let conditional = "";
        if (this.transformOption.mode && this.transformOptionChange) {
          conditional += `c_${this.transformOption.mode}`
        }
        if (this.transformOption.width != 100) {
          conditional += `,w_${this.transformOption.width}`
        }
        if (this.transformOption.height != 100) {
          conditional += `,h_${this.transformOption.height}`
        }
        conditional != "" ? conditionals.push(conditional) : '';
        let url_array = this.format_transform_url(conditionals);
        return url_array.join('/').toLocaleLowerCase()
      }
    }
  }
</script>
<style>
  .ivu-slider-input .ivu-slider-wrap {
    /* width: auto; */
    margin-right: 100px;
    width: 80px;
  }

  .ivu-slider-input .ivu-input-number {
    float: right;
    margin-top: -14px;
    width: 60px;
  }
</style>
