<template>
  <table class="tab-box" aria-describedby="its-grid">
    <tr v-for="(row, row_index) in data" :key="row_index">
      <template v-for="(cell, cell_index) in row">
        <th v-if="row_index === 0" :id="cell_index" :key="cell_index">
          <span>{{ cell }}</span>
        </th>
        <td v-else :key="cell_index">
          <span>{{ cell }}</span>
        </td>
      </template>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ItsGridP',
  props: {
    data: {
      type: Array,
      default: () => [[]]
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-box,
td {
  font-size: 12px;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
}
td {
  padding: 0 10px;
}
</style>
