<template>
  <header :class="ns" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-header'
})
export default class EmHeader extends Vue {
  @Prop({ type: String, default: null })
  private height!: String

  private ns = 'em-header'

  get style () {
    return this.height
      ? { '--em-header-height': this.height }
      : {}
  }
}
</script>
