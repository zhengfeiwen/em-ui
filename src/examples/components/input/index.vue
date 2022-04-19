<template>
  <div style="width: 500px;">
    <!-- <em-input prefix-svg="zip"></em-input>
    <em-input size="small"><em-icon slot="prefix" svg="user"></em-icon></em-input>
    <em-input size="small" suffix-svg="zip"></em-input> -->
    <em-input v-model="val" maxlength="10" :show-word-limit="!0" size="small" :clearable="!0"></em-input>
    <!-- <em-input size="small"><em-icon slot="suffix" svg="user"></em-icon></em-input> -->
    <hr>
    <em-input style="color: red;font-size: 30px;" v-model="val" type="textarea" maxlength="10" :show-word-limit="!0" :autosize="{minRows: 33, maxRows: 33}"></em-input>
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
