<template>
  <div v-if="tag === 'div'" :class="['em-row', isJustify, isAlign]" :style="style">
    <slot></slot>
  </div>
  <p v-else-if="tag === 'p'" :class="['em-row', isJustify, isAlign]" :style="style">
    <slot></slot>
  </p>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-row'
})
export default class EmRow extends Vue {
  @Prop({ type: String, default: 'div' })
  private tag!: String

  @Prop({ type: String, default: 'start' })
  private justify!: String

  @Prop({ type: String, default: 'top' })
  private align!: String

  @Prop({ type: Number, default: 0 })
  private gutter!: number

  @Provide('gutter')
  rGutter = this.gutter

  get isJustify () {
    return `is-justify-${this.justify}`
  }

  get isAlign () {
    return `is-align-${this.align}`
  }

  get style () {
    const styles = {
      marginLeft: '',
      marginRight: ''
    }
    if (this.gutter) {
      styles.marginLeft = `-${this.gutter / 2}px`
      styles.marginRight = styles.marginLeft
    }
    return styles
  }
}
</script>
