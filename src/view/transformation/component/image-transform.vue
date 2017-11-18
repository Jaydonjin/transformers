<script src="../../../../static/transformUrl.js"></script>
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
            <Slider v-model="transformModel.width" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Height:" class="transform_option_item">
            <div slot="label">Height:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformModel.height" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Mode:" class="transform_option_item">
            <div slot="label">Mode:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <div class="select_item">
              <Select v-model="transformModel.crop" size="small">
                <Option v-for="modeType in transformOption.modes" :value="modeType.toLowerCase()" :key="modeType">{{ modeType }}</Option>
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
              <Select v-model="transformModel.format" size="small">
                <Option v-for="formatType in transformOption.formatTypes" :value="formatType" :key="formatType">{{ formatType }}
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
            <Slider v-model="transformModel.quality" show-input></Slider>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="Rotation angle:" class="transform_option_item">
            <div slot="label">Rotation angle:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformModel.angle" :min="0" :max="360" show-input></Slider>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
          <FormItem label="Corner radius:" class="transform_option_item">
            <div slot="label">Corner radius:<a style="padding-left: 5px">
              <Icon type="ios-help-outline"></Icon>
            </a>
            </div>
            <Slider v-model="transformModel.radius" :min="0" :max="30" show-input></Slider>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
      <Col :span="14">
      <div class="transform_area_preview" style="min-height: 400px">
        <img class="transform_preview_img" :src="preview_transform_url">
        <Spin size="small" fix v-if="transformOptionChange"><span></span></Spin>
        <Button class="refreshButton" v-if="transformOptionChange" type="primary" icon="refresh" @click="on_refresh()">Refresh Preview</Button>
        <a class="transform_preview_full_image">
          <span><a :href="current_transform_url" target="_blank">View full-size image</a></span>
        </a>
        <div>
          <b-card no-body>
            <b-tabs small card>
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
  </div>
</template>
<script>
  import store from '@/store'
  import config from '@/config'
  import cloudinary from 'cloudinary-core';
  import {session} from '@/common'
  export default{
    name: "Brainstorm",
    data(){
      return {
        current_img: store.state.image.info,
        transformModel: this.init_transform_model(),
        transformOption:{
          modes: ['Scale', 'Fill'],
          formatTypes: ['Keep format', 'JPG', 'PNG']
        },
        transformOptionChange: false,
        preview_transform_url:DfisTransformers.url(store.state.user.info.HashID,store.state.image.info.FullName,{transformation:[]}),
        dfisUrl: config.getDFISUrl(store.state.user.info.HashID, false)
      }
    },
    methods: {
      init_transform_model(){
        return {width: 100, height: 100, crop: 'scale', format: 'Keep format', radius:0,quality: 100, angle: 0}
      },
      on_reset_option(){
        this.transformModel = this.init_transform_model();
        this.transformModelChange = false;
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
      on_refresh(){
        this.preview_transform_url = this.current_transform_url;
        this.transformOptionChange=false
      }
    },
    watch: {
      transformModel: {
        handler: function () {
          console.log(this.transformModel);
          this.transformOptionChange = true
        },
        deep: true
      }
    },
    computed: {
      current_transform_url: function () {
        return DfisTransformers.url(store.state.user.info.HashID,this.current_img.FullName,{transformation:[this.transformModel]});
      }
    },
    mounted(){
    },
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
