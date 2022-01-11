<template>
  <svg-icon v-if="svg" :name="svg" :class="iClass" :style="iStyle"/>
  <i v-else-if="fa" class="fa" :class="iClass"  :style="iStyle"></i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IconSize, RotateSize } from '@/utils/types/icon'

@Component({
  name: 'em-icon'
})
export default class EmIcon extends Vue {
  // svg 图标名
  @Prop({ type: String, default: '' })
  public svg!: string;

  // fa 图标名
  @Prop({ type: String, default: '' })
  public fa!: string;

  // 旋转 目前支持 90 270 360
  @Prop({ type: [String, Number], default: '' })
  public rotate!: RotateSize;

  // 增加左右间距 固定宽度
  @Prop({ type: Boolean, default: false })
  public fw!: boolean;

  // 支持li样式替换 需要在ul层加 em-icon-ul类
  @Prop({ type: Boolean, default: false })
  public li!: boolean;

  // 中心旋转
  @Prop({ type: Boolean, default: false })
  public spin!: boolean;

  // 图标尺寸 支持 lg 2x 3x 4x 5x
  @Prop({ type: String, default: '' })
  public size!: IconSize;

  // 图标内联样式
  @Prop({ type: String })
  public iStyle!: string;

  get iClass () {
    let rotateStyle
    if (this.fa) {
      rotateStyle = `${this.rotate ? 'fa-rotate-' + this.rotate : ''}`
      return `${this.fa} ${this.size ? 'fa-' + this.size : ''} ${this.fw ? 'fa-fw' : ''} ${this.li ? 'fa-li' : ''} ${this.spin ? 'fa-spin' : ''} ${rotateStyle}`
    } else if (this.svg) {
      rotateStyle = `${this.rotate ? 'svg-rotate-' + this.rotate : ''}`
      return `${this.size ? 'svg-' + this.size : ''} ${this.fw ? 'svg-fw' : ''} ${this.li ? 'svg-li' : ''} ${this.spin ? 'svg-spin' : ''} ${rotateStyle}`
    }
  }
}
</script>
<style lang="scss">
  .svg-icon{
    &.svg-lg{
      font-size: 1.33333333em;
      line-height: .75em;
      vertical-align: -34%;
    }
    &.svg-2x{
      font-size: 2em;
    }
    &.svg-3x{
      font-size: 3em;
    }
    &.svg-4x{
      font-size: 4em;
    }
    &.svg-5x{
      font-size: 5em;
    }
    &.svg-fw{
      width: 1.28571429em !important;
      text-align: center;
    }
    &.svg-li{
      position: absolute;
      left: -1.73212121em;
      width: 2.14285714em;
      top: .14285714em;
      text-align: center;
    }
    &.svg-rotate-90{
      -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    &.svg-rotate-270{
      -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    &.svg-rotate-360{
      -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .em-icon-ul{
    padding-left: 0;
    margin-left: 2.14285714em;
    list-style-type: none;
    li{
      position: relative;
    }
  }

  @keyframes svg-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
</style>
