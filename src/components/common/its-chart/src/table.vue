<template>
  <div>
    <div v-for="item of schema" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    schema: {
      type: Array,
      default: () => []
    }
  }
}
</script>
