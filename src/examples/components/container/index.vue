<template>
  <div class="common-layout">
    <em-container>
      <em-header>Header</em-header>
      <em-container>
        <em-aside width="200px">Aside</em-aside>
        <em-container>
          <em-main>Main</em-main>
          <em-footer>Footer</em-footer>
        </em-container>
      </em-container>
    </em-container>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import EmContainer from '@/packages/container/container.vue'
import EmAside from '@/packages/container/aside.vue'
import EmHeader from '@/packages/container/header.vue'
import EmFooter from '@/packages/container/footer.vue'
import EmMain from '@/packages/container/main.vue'
import '@/packages/theme/container.scss'

@Component({
  name: 'em-container-demo',
  components: {
    EmContainer,
    EmAside,
    EmHeader,
    EmFooter,
    EmMain
  }
})

export default class ContainerDemo extends Vue {
  //
}
</script>

<style lang="scss" scoped>
.common-layout .em-header,
.common-layout .em-footer {
  background-color: #b3c0d1;
  color: var(--em-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .em-footer {
  line-height: 60px;
}

.common-layout .em-aside {
  background-color: #d3dce6;
  color: var(--em-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .em-main {
  background-color: #e9eef3;
  color: var(--em-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .em-container {
  margin-bottom: 40px;
}

.common-layout .em-container:nth-child(5) .em-aside,
.common-layout .em-container:nth-child(6) .em-aside {
  line-height: 260px;
}

.common-layout .em-container:nth-child(7) .em-aside {
  line-height: 320px;
}
</style>
