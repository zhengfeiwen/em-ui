<template>
  <div>111
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/packages/button/main.vue'

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
