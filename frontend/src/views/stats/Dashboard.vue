<template>
  <div>
    <h2>系统统计</h2>
    <p>总房源：{{ stats.total_properties }}</p>
    <p>合同数量：{{ stats.total_contracts }}</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return { stats: {} }
  },
  async mounted() {
    const token = localStorage.getItem("token")

    const res = await axios.get(
      "http://127.0.0.1:5000/api/stats/",
      { headers: { Authorization: `Bearer ${token}` } }
    )

    this.stats = res.data
  }
}
</script>