<template>
  <div>
    <em-icon svg="zip" size="3x" fw></em-icon>
    <em-icon fa="fa-camera-retro" size="3x" fw></em-icon>
    <em-icon fa="fa-camera-retro" size="3x" fw></em-icon>
    <ul class="em-icon-ul">
      <li><em-icon svg="zip" fw li rotate="90"></em-icon>2121212</li>
      <li><em-icon fa="fa-camera-retro" fw li></em-icon>List icons</li>
      <li><i class="fa-li fa fa-camera-retro "></i>can be used</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Icon from '@/packages/icon/main.vue'

@Component({
  name: 'em-icon-demo',
  components: {
    'em-icon': Icon
  }
})

export default class IconDemo extends Vue {
  //
}
</script>

<style>

</style>
