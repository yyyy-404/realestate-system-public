<template>
  <input type="file" @change="upload" />
</template>

<script>
import request from "../api/request"

export default {
  emits: ["uploaded"],
  methods: {
    async upload(e) {
      const form = new FormData()
      form.append("image", e.target.files[0])

      const res = await request.post("/property-image/", form)

      this.$emit("uploaded", res.data)
    }
  }
}
</script>