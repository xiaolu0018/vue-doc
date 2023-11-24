<!--
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-10 14:28:31
 * @Description:
 * @FilePath: \src\src\components\common\its-detail-panel\src\detail-panel.vue
-->
<template>
  <div class="container">
    <template>
      <detail-panel-item
        v-for="(item, index) in localItems"
        :key="index"
        :title="item.groupName"
        :items="item.items"
      ></detail-panel-item>
    </template>
  </div>
</template>
<script>
import DetailPanelItem from './detail-panel-item'
export default {
  name: 'ItsDetailPanel',
  components: { DetailPanelItem },
  props: {
    items: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    localItems() {
      let filterItems = []
      if (this.data && Object.keys(this.data).length > 0) {
        this.items.forEach(({ groupName, items }) => {
          if (groupName && items.length > 0) {
            const map = items.map(({ key, val, ...other }) => {
              if (Object.prototype.hasOwnProperty.call(this.data, val) && this.data[val]) {
                return { text: key, key: val, val: this.data[val], ...other }
              } else {
                return { text: key, key: val, val: '-', ...other }
              }
            })
            filterItems.push({ groupName, items: map })
          }
        })
      } else {
        filterItems = this.items.map(({ groupName, items }) => {
          return {
            groupName,
            items: items.map(({ key, val, ...other }) => {
              return { text: key, key: val, val: '-', ...other }
            })
          }
        })
      }
      return filterItems
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
