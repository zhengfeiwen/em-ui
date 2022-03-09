<template>
  <footer class="em-footer" :style="style">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-footer'
})
export default class EmFooter extends Vue {
  @Prop({ type: String, default: null })
  private height!: String

  get style () {
    return this.height
      ? { '--em-footer-height': this.height }
      : {}
  }
}
</script>
