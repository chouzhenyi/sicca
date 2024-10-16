<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import router from '@/router/index'
const { routes } = router.options
const $route = useRoute()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink
          v-for="(item, index) in routes"
          :to="item.path"
          :key="index"
          class="link"
          :class="{ active: item.name === $route.name }"
        >
          {{ item.meta?.title }}
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style lang="less" scoped>
.wrapper {
  nav {
    font-size: 16px;
    .link {
      text-decoration: none;
      color: #666;
      border-radius: 2px;
      padding: 0 16px;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      position: relative;

      &.active,
      &:active {
        color: #639ef4;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 40%;
        width: 1px;
        background-color: #ddd;
      }

      &:nth-last-child(1) {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
