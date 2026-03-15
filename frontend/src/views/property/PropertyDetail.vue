<template>
  <div v-if="property">
    <h2>{{ property.title }}</h2>
    <p>价格：{{ property.price }}</p>
    <p>{{ property.description }}</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return { property: null }
  },
  async mounted() {
    const id = this.$route.params.id
    const res = await axios.get(
      `http://127.0.0.1:5000/api/property/${id}`
    )
    this.property = res.data
  }
}
</script>