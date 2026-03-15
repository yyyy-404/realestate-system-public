<!-- src/views/favorite/FavoriteList.vue -->
<template>
  <div>
    <h2>我的收藏</h2>
    <div v-for="f in list" :key="f.id" style="border:1px solid #eee;padding:8px;margin-bottom:8px">
      {{ f.property?.title || "房源已删除" }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFavorites } from "../../api/favorite";

const list = ref([]);

onMounted(async () => {
  try {
    const res = await getFavorites();
    list.value = res.data || [];
  } catch (err) {
    console.error(err);
  }
});
</script>