<template>

  <div class="transform_area">
    <Row>
      <Col :span="10" class="transform_option_area">
      <Form ref="transformOption" :model="transformOption" label-position="top">
        <h3>Resize & crop</h3>
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
        <img class="transform_preview_img" :src="current_img.detail.url">
        <a class="transform_preview_full_image">
          <span>View full-size image</span>
        </a>
        <div>
          <Tabs type="card">
            <TabPane label="URL">
              <pre><a class="transform_sdk_url">http://scmesos04/autotest/normalgroup/monitor.jpg</a></pre>
            </TabPane>
          </Tabs>
        </div>
      </div>
      </Col>
    </Row>
    {{current_transform_url}}
  </div>
</template>
<script>
  import store from '../../../store'
  export default{
    name: "Brainstorm",
    data(){
      return {
        current_img: store.state.currentImg,
        transformOption: {width: 100, height: 100, mode: 'Scale', format: 'Keep format', quality: 100, rotation: 0},
        modes: ['Scale', 'Fill'],
        formatTypes: ['Keep format', 'JPG', 'PNG']
      }
    },
    methods: {
      create_conditional(){
        console.log(this.transformOption.width);
        return this.transformOption.width
      }
    },
    computed: {
      current_transform_url: function () {
        let url = "";
        if (this.transformOption.mode) {
          url += `c_${this.transformOption.mode}`
        }
        if (this.transformOption.width != 100) {
          url += `,w_${this.transformOption.width}`
        }
        if (this.transformOption.height != 100) {
          url += `,h_${this.transformOption.height}`
        }
        return url.toLocaleLowerCase()
      }
    }
  }
</script>
<style>
  .transform_area {
    padding-left: 20px;
  }

  .transform_option_area {
    padding-top: 20px;
  }

  .transform_area_preview {
    box-shadow: -1px 0 0px #ccc;
    border-left: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 0px 0px 20px;
  }

  .transform_preview_img {
    border: 1px solid #b4bfcd;
    max-width: 70%;
    max-height: 300px;
  }

  .transform_sdk_url {
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
    color: #333;
    text-decoration: underline;
  }

  .transform_preview_full_image {
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
    color: #333;
    text-decoration: underline;
    text-align: left;
    display: block;
  }

  .transform_option_area h3 {
    font-size: 14px;
    font-weight: bold;
    color: #426188;
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 14px 0;
    padding: 0;
  }

  .transform_option_item {
    padding-right: 20px;
  }

  .transform_option_item .slider_item {
    /*margin-top: 40px*/
  }

  .transform_option_item .select_item {
    width: 70%;
  }

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
