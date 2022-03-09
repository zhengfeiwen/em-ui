<template>
  <a :disabled="disabled" @click="handleclick" :class="fClass()" :href="href">
    <template v-if="icon">
      <i :class="icon"></i>
    </template>
    <template v-else-if="svg">
      <svg-icon :name="svg"/>
    </template>
    <span v-if="!!$slots.default"><slot></slot></span>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { LinkType } from './types'
@Component({
  name: 'em-button'
})
export default class Embutton extends Vue {
  @Prop({ type: String, default: 'default' })
  private type!: LinkType

  @Prop({ type: Boolean, default: !1 })
  private underline!: boolean

  @Prop({ type: Boolean, default: !1 })
  private disabled!: boolean

  @Prop({ type: String })
  private href!: string

  @Prop({ type: String })
  private icon!: string

  @Prop({ type: String })
  private svg!: string

  private fClass () {
    const disabled = this.disabled ? ' is-disabled' : ''
    return `em-link em-link--${this.type}${disabled}`
  }

  private handleclick () {
    this.disabled || this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>
