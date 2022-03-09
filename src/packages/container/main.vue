<template>
  <main class="em-main">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'em-main'
})
export default class EmMain extends Vue {
}
</script>
