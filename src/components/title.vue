<template>
  <div class="console_title_bar">
    <slot name="title_text"></slot>
  </div>
</template>

<script>
  export default {
    name: 'dfisTitle',
  }
</script>
<style>
  .console_title_bar{
    height: 65px;
    background: linear-gradient(to bottom,white 0,#e8e8e8 100%);
  }
.console_title_bar h1 {
    font-size: 24px;
    color: #222;
    line-height: 70px;
    padding-left: 21px;
    margin: 0;
  }
</style>
