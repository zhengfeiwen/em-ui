<template>
  <div>
    <em-link href="https://element.eleme.io" target="_blank">default</em-link>
    <em-link type="primary">primary</em-link>
    <em-link type="success">success</em-link>
    <em-link type="warning">warning</em-link>
    <em-link type="danger" :disabled="!0">danger</em-link>
    <em-link type="info">info</em-link>
    <em-link svg="zip">Edit</em-link>
    <em-link>
      Check<em-icon svg="bug"></em-icon>
    </em-link>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Link from '@/packages/link/main.vue'
import Icon from '@/packages/icon/main.vue'
import '@/packages/theme/link.scss'

@Component({
  name: 'em-link-demo',
  components: {
    'em-link': Link,
    'em-icon': Icon
  }
})

export default class LinkDemo extends Vue {
  //
}
</script>

<style>
.em-link{ margin-right: 10px;}
</style>
