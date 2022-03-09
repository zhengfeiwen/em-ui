<template>
  <div>
    <em-row class="row-bg">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
    <em-row class="row-bg" justify="center">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
    <em-row class="row-bg" justify="end">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
    <em-row class="row-bg" justify="space-between">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
    <em-row class="row-bg" justify="space-around">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
    <em-row class="row-bg" justify="space-evenly">
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple-light"></div></em-col>
      <em-col :span="6"><div class="grid-content bg-purple"></div></em-col>
    </em-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import EmRow from '@/packages/layout/row.vue'
import EmCol from '@/packages/layout/col.vue'
import '@/packages/theme/layout.scss'

@Component({
  name: 'em-layout-demo',
  components: {
    EmRow,
    EmCol
  }
})

export default class LayoutDemo extends Vue {
  //
}
</script>

<style lang="scss" scoped>
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .em-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
