<template>
  <div v-if="tag === 'div'" :class="['em-col', colSpan, colPush, colPull, colXs, colSm, colMd, colLg, colXl]" :style="style">
    <slot></slot>
  </div>
  <span v-else-if="tag === 'span'" :class="['em-col', colSpan, colPush, colPull, colXs, colSm, colMd, colLg, colXl]" :style="style">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-col'
})
export default class EmCol extends Vue {
  @Prop({ type: Number, default: 24 })
  private span!: number

  @Prop({ type: Number, default: 0 })
  private offset!: number

  @Prop({ type: Number, default: 0 })
  private push!: number

  @Prop({ type: Number, default: 0 })
  private pull!: number

  @Prop({ type: [Number, Object] })
  private xs!: number|object

  @Prop({ type: [Number, Object] })
  private sm!: number|object

  @Prop({ type: [Number, Object] })
  private md!: number|object

  @Prop({ type: [Number, Object] })
  private lg!: number|object

  @Prop({ type: [Number, Object] })
  private xl!: number|object

  @Prop({ type: String, default: 'div' })
  private tag!: string

  @Inject({ from: 'gutter', default: '' })
  private gutter!: any

  get style () {
    const styles = {
      paddingLeft: '',
      paddingRight: ''
    }
    if (this.gutter) {
      styles.paddingLeft = `${this.gutter / 2}px`
      styles.paddingRight = `${this.gutter / 2}px`
    }
    return styles
  }

  get colSpan () {
    return `em-col-${this.span}`
  }

  get colPush () {
    return `em-push-${this.push}`
  }

  get colPull () {
    return `em-pull-${this.pull}`
  }

  get colXs () {
    if (typeof this.xs === 'number') return `em-col-xs-${this.xs}`
    else if (typeof this.xs === 'object') {
      const sizeProps: any = this.xs
      let cls = ''
      Object.keys(sizeProps).forEach((prop) => {
        cls = (prop !== 'span'
          ? `xs-${prop}-${sizeProps[prop]}`
          : `xs-${sizeProps[prop]}`)
      })
      return cls
    }
  }

  get colSm () {
    if (typeof this.sm === 'number') return `em-col-sm-${this.sm}`
    else if (typeof this.sm === 'object') {
      const sizeProps: any = this.sm
      let cls = ''
      Object.keys(sizeProps).forEach((prop) => {
        cls = (prop !== 'span'
          ? `sm-${prop}-${sizeProps[prop]}`
          : `sm-${sizeProps[prop]}`)
      })
      return cls
    }
  }

  get colMd () {
    if (typeof this.md === 'number') return `em-col-md-${this.md}`
    else if (typeof this.md === 'object') {
      const sizeProps: any = this.md
      let cls = ''
      Object.keys(sizeProps).forEach((prop) => {
        cls = (prop !== 'span'
          ? `md-${prop}-${sizeProps[prop]}`
          : `md-${sizeProps[prop]}`)
      })
      return cls
    }
  }

  get colLg () {
    if (typeof this.lg === 'number') return `em-col-lg-${this.lg}`
    else if (typeof this.lg === 'object') {
      const sizeProps: any = this.lg
      let cls = ''
      Object.keys(sizeProps).forEach((prop) => {
        cls = (prop !== 'span'
          ? `lg-${prop}-${sizeProps[prop]}`
          : `lg-${sizeProps[prop]}`)
      })
      return cls
    }
  }

  get colXl () {
    if (typeof this.xl === 'number') return `em-col-xl-${this.xl}`
    else if (typeof this.xl === 'object') {
      const sizeProps: any = this.xl
      let cls = ''
      Object.keys(sizeProps).forEach((prop) => {
        cls = (prop !== 'span'
          ? `xl-${prop}-${sizeProps[prop]}`
          : `xl-${sizeProps[prop]}`)
      })
      return cls
    }
  }
}
</script>
