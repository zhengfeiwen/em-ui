<template>
  <div>
    <div class="border-1-dashed border-demo shadow-light">1111</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import '@/packages/theme/border.scss'

@Component({
  name: 'em-border-demo'
})

export default class BorderDemo extends Vue {
  //
}
</script>

<style>
.border-demo{
  margin: 10px;
  height: 100px;
  width: 200px;
}
</style>
