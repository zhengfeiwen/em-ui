<template>
  <div style="width: 120px;">
    <em-input type="primary" prefix-svg="zip"></em-input>
    <em-input type="primary" size="small"><em-icon slot="prefix" svg="user"></em-icon></em-input>
    <em-input type="primary" size="small" suffix-svg="zip"></em-input>
    <em-input v-model="val" type="primary" size="small" :clearable="!0"></em-input>{{val}}
    <em-input type="primary" size="small"><em-icon slot="suffix" svg="user"></em-icon></em-input>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Input from '@/packages/input/main.vue'
import Icon from '@/packages/icon/main.vue'
import '@/packages/theme/input.scss'

@Component({
  name: 'em-input-demo',
  components: {
    'em-input': Input,
    'em-icon': Icon
  }
})

export default class InputDemo extends Vue {
  //
  private val = '11111111111112222222222'
}
</script>

<style>
.em-input{ margin-right: 10px;}
</style>
