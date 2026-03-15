<!-- src/views/contract/ContractList.vue -->
<template>
  <div>
    <h2>合同管理</h2>
    <div v-for="c in list" :key="c.id" style="border:1px solid #eee;padding:10px;margin-bottom:8px">
      房源: {{ c.property_id }}, 买家: {{ c.buyer_id }}, 价格: {{ c.price }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getContracts } from "../../api/contract";

const list = ref([]);

onMounted(async () => {
  try {
    const res = await getContracts();
    list.value = res.data || [];
  } catch (err) {
    console.error(err);
  }
});
</script>