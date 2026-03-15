<!-- src/views/property/PropertyCreate.vue -->
<template>
  <div>
    <h2>发布房源</h2>
    <input v-model="title" placeholder="标题" />
    <input v-model="price" placeholder="价格" />
    <textarea v-model="description" placeholder="描述"></textarea>
    <ImageUpload @uploaded="onUploaded" />
    <div style="margin-top:10px">
      <button @click="submit">发布</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageUpload from "../../components/ImageUpload.vue";
import { createProperty } from "../../api/property";
import { useRouter } from "vue-router";

const title = ref("");
const price = ref("");
const description = ref("");
const image_id = ref(null);
const router = useRouter();

function onUploaded(data) {
  // 假设后端返回 { id, url }
  image_id.value = data.id || null;
}

async function submit() {
  try {
    const payload = { title: title.value, price: price.value, description: description.value, image_id: image_id.value };
    await createProperty(payload);
    alert("发布成功");
    router.push("/properties");
  } catch (err) {
    alert("发布失败");
  }
}
</script>