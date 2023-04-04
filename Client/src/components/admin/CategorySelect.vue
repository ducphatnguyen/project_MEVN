<template>
    <select v-bind="$attrs" v-model="selectedCategory">
      <option value="" disabled hidden>Vui lòng chọn danh mục</option>
      <option v-for="(category, index) in categories" :key="index" :value="category._id">
        {{ category.name }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selectedCategory: this.value
      };
    },
    watch: {
      selectedCategory(newValue) {
        this.$emit("input", newValue);
      },
      value(newValue) {
        this.selectedCategory = newValue;
      }
    }
  };
  </script>
  