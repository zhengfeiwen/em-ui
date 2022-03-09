<template>
  <section :class="[ns, {'is-vertical': isVertical}]">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-container'
})
export default class EmContainer extends Vue {
  @Prop({ type: String, default: '' })
  private direction!: String

  private ns = 'em-container'

  get isVertical () {
    if (this.direction === 'vertical') {
      return true
    } else if (this.direction === 'horizontal') {
      return false
    }
    if (this.$slots && this.$slots.default) {
      const vNodes: VNode[] = this.$slots.default
      return vNodes.some((vNode) => {
        const tag: string = vNode.tag || ''
        return tag.indexOf('em-header') !== -1 || tag.indexOf('em-footer') !== -1
      })
    } else {
      return false
    }
  }
}
</script>
