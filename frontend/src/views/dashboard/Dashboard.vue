<!-- frontend/src/views/dashboard/Dashboard.vue -->
<template>
  <div>
    <h2>仪表盘</h2>
    <div class="cards">
      <div class="card">房源总数<br /><strong>-</strong></div>
      <div class="card">收藏数<br /><strong>-</strong></div>
      <div class="card">合同数<br /><strong>-</strong></div>
    </div>
    <p class="hint">提示：这些数据可由后端接口 `/property` `/favorite` `/contract` 提供，我可以继续对接。</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.cards {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.card {
  flex: 1;
  background: white;
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  text-align: center;
}
.hint {
  margin-top: 16px;
  color: #6b7280;
}
</style>