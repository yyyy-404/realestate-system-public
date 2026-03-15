<!-- src/views/property/PropertyList.vue -->
<template>
  <div>
    <h2>房源列表</h2>
    <div v-if="props.length === 0">暂无房源</div>
    <div v-for="p in props" :key="p.id" style="border:1px solid #eee;padding:12px;margin-bottom:8px">
      <router-link :to="`/properties/${p.id}`">{{ p.title }}</router-link>
      <div>价格: {{ p.price }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProperties } from "../../api/property";

const props = ref([]);

onMounted(async () => {
  try {
    const res = await getProperties();
    props.value = res.data || [];
  } catch (err) {
    console.error(err);
  }
});
</script>