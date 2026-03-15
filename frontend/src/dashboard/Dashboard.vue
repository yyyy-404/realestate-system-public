<template>
  <div>
    <h2>系统统计</h2>
    <div ref="chart" style="height:400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import request from "../../api/request"

export default {
  async mounted() {
    const res = await request.get("/stats/")

    const chart = echarts.init(this.$refs.chart)

    chart.setOption({
      xAxis: { type: "category", data: ["房源", "合同"] },
      yAxis: { type: "value" },
      series: [{
        type: "bar",
        data: [
          res.data.total_properties,
          res.data.total_contracts
        ]
      }]
    })
  }
}
</script>