<template>
  <div>
    <h2>发布房源</h2>

    <input v-model="title" placeholder="标题" />
    <input v-model="price" placeholder="价格" />
    <textarea v-model="description"></textarea>

    <ImageUpload @uploaded="onImage" />

    <button @click="submit">发布</button>
  </div>
</template>

<script>
import request from "../../api/request"
import ImageUpload from "../../components/ImageUpload.vue"

export default {
  components: { ImageUpload },
  data() {
    return {
      title: "",
      price: "",
      description: "",
      image_id: null
    }
  },
  methods: {
    onImage(data) {
      this.image_id = data.id
    },
    async submit() {
      await request.post("/property/", {
        title: this.title,
        price: this.price,
        description: this.description,
        image_id: this.image_id
      })

      alert("发布成功")
      this.$router.push("/properties")
    }
  }
}
</script>