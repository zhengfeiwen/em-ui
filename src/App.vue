<template>
  <div class="em-container">
    <div class="em-main">
      <!-- <em-icon-demo></em-icon-demo>
      <em-button-demo></em-button-demo>
      <em-border-demo></em-border-demo>
      <em-container-demo></em-container-demo>
      <em-layout-demo></em-layout-demo> -->
      <em-link-demo></em-link-demo>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import IconDemo from './examples/components/icon/index.vue'
import ButtonDemo from './examples/components/button/index.vue'
import BorderDemo from './examples/components/border/index.vue'
import ContainerDemo from './examples/components/container/index.vue'
import LayoutDemo from './examples/components/layout/index.vue'
import LinkDemo from './examples/components/link/index.vue'
@Component({
  components: {
    'em-button-demo': ButtonDemo,
    'em-icon-demo': IconDemo,
    'em-border-demo': BorderDemo,
    'em-container-demo': ContainerDemo,
    'em-layout-demo': LayoutDemo,
    'em-link-demo': LinkDemo
  }
})
export default class App extends Vue {
}
</script>

<style lang='scss' scoped>
@import "../src/styles/em/container.scss";
</style>
