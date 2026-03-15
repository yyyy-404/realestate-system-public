<!-- src/views/property/PropertyDetail.vue -->
<template>
  <div v-if="p">
    <h2>{{ p.title }}</h2>
    <p>价格: {{ p.price }}</p>
    <p>描述: {{ p.description }}</p>
    <button @click="fav">收藏</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProperty } from "../../api/property";
import { addFavorite } from "../../api/favorite";

const route = useRoute();
const p = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const res = await getProperty(id);
  p.value = res.data;
});

async function fav() {
  try {
    await addFavorite(p.value.id);
    alert("收藏成功");
  } catch (err) {
    alert("收藏失败");
  }
}
</script>