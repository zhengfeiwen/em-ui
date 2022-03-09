<template>
  <div>
    <em-button type="danger" plain disabled >按钮</em-button>
    <em-button type="info" plain>按钮</em-button>
    <em-button type="primary" plain>按钮</em-button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/packages/button/main.vue'
import '@/packages/theme/button.scss'

@Component({
  name: 'em-button-demo',
  components: {
    'em-button': Button
  }
})

export default class ButtonDemo extends Vue {
  //
}
</script>

<style>

</style>
