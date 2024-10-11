<!-- @format -->

<template>
  <div class="wrapper">
    <div class="menu-wrapper">
      <div
        v-for="item in routeItems"
        :key="item.key"
        @click="() => handleClick(item)"
        class="menu-item"
        :class="{
          active: item.key === selectedKey,
        }"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
    <RouterView class="content" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import { routes } from "./router/routes";

const selectedKey = ref<string>("Index");
const routeItems = routes
  .filter((item) => item.name !== "Root")
  .map((item) => {
    const { name: key, meta } = item;
    const { title: label } = meta;
    return { key, label };
  });

const router = useRouter();
onMounted(() => {
  // TODO:
  const $route = useRoute();
  // console.log($route.name, routeItems);
  // selectedKey.value = $route.name as string;
});
const handleClick = (route) => {
  const { key } = route;
  selectedKey.value = key;
  router.push({
    name: key as string,
  });
};
</script>
<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
  .menu-wrapper {
    width: 240px;
    padding: 0 10px;
    border-right: 1px solid #eee;
    .menu-item {
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      font-weight: 600;
      border-bottom: 1px solid #aaa;

      &.active,
      &:hover {
        color: #639ef4;
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>
