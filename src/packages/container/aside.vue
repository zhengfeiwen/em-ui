<template>
  <aside class="em-aside" :style="style">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-aside'
})
export default class EmAside extends Vue {
  @Prop({ type: String, default: null })
  private width!: String

  get style () {
    return this.width
      ? { '--em-aside-width': this.width }
      : {}
  }
}
</script>
