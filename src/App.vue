<template>
  <div class="em-container">
    <div class="em-main">
      <em-icon-demo></em-icon-demo>
      <em-button-demo></em-button-demo>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import IconDemo from './examples/components/icon/index.vue'
import ButtonDemo from './examples/components/button/index.vue'
@Component({
  components: {
    'em-button-demo': ButtonDemo,
    'em-icon-demo': IconDemo
  }
})
export default class App extends Vue {
}
</script>

<style lang='scss' scoped>
@import "../src/styles/em/container.scss";
</style>
