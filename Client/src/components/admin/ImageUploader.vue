<template>
    <div>
      <input type="file" @change="onFileChange" />
      <img v-if="imageUrl" :src="imageUrl" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String
    },
    data() {
      return {
        imageUrl: this.value || null
      }
    },
    methods: {
      async onFileChange(event) {
        const file = event.target.files[0]
        if (!file) return
  
        const formData = new FormData()
        formData.append('image', file)
  
        // Here you can send the formData to your backend to upload the image
        // and receive a URL to the uploaded image
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        this.imageUrl = data.imageUrl
  
        // Emit the updated value to the parent component
        this.$emit('input', this.imageUrl)
      }
    }
  }
  </script>
  