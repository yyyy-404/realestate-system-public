<!-- src/components/ImageUpload.vue -->
<template>
  <div>
    <input type="file" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadImage } from "../api/property";

const file = ref(null);

async function onFileChange(e) {
  const f = e.target.files[0];
  if (!f) return;
  const form = new FormData();
  form.append("image", f);
  try {
    const res = await uploadImage(form);
    // 返回内容格式以你后端为准：这里假设 res.data = { id, url }
    // 把结果 emit 或放在上层处理；本示例简单 alert
    alert("上传成功: " + JSON.stringify(res.data));
    // 如果需要把结果传回，使用 $emit 等（此处简化）
  } catch (err) {
    alert("上传失败");
  }
}
</script>