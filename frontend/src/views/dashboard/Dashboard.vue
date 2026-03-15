<!-- src/views/dashboard/Dashboard.vue -->
<template>
  <div>
    <h2>仪表盘</h2>
    <div style="display:flex;gap:20px">
      <div style="flex:1">
        <div ref="chart" style="height:360px"></div>
      </div>
      <div style="width:300px">
        <p>总房源: {{ stats.total_properties }}</p>
        <p>总合同: {{ stats.total_contracts }}</p>
        <p>总用户: {{ stats.total_users }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { getStats } from "../../api/stats";

const chart = ref(null);
const stats = ref({ total_properties: 0, total_contracts: 0, total_users: 0 });

onMounted(async () => {
  try {
    const res = await getStats();
    stats.value = res.data;
    const myChart = echarts.init(chart.value);
    myChart.setOption({
      title: { text: "系统统计" },
      tooltip: {},
      xAxis: { type: "category", data: ["房源", "合同", "用户"] },
      yAxis: { type: "value" },
      series: [{ type: "bar", data: [stats.value.total_properties, stats.value.total_contracts, stats.value.total_users] }],
    });
  } catch (err) {
    console.error(err);
  }
});
</script>