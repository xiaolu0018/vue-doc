<!--
 * @Author: 庞超
 * @Date: 2022-07-11 17:13:20
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-19 16:05:14
 * @Description:
 * @FilePath: \src\src\components\common\its-detail-view\src\index.vue
-->
<template>
  <div class="its-descriptions-group">
    <its-descriptions :items="localItems" :data="data" :height="height" :column="column" />
  </div>
</template>
<script>
import { commonBusiness } from '@/api/common'
import ItsDescriptions from '../components/its-descriptions.vue'
import { isEmptyString } from '@/utils/unit'
export default {
  name: 'DetailView',
  components: {
    ItsDescriptions
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    column: {
      type: Number,
      default: 4
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    localItems() {
      const filterItems = []
      if (this.data && Object.keys(this.data).length > 0) {
        this.items.forEach(({ groupName, items }) => {
          if (groupName && items.length > 0) {
            const map = items.map(({ key, val, ...other }, index) => {
              let span = 1
              if (index === items.length - 1) {
                span = 5 - (items.length % 4)
              }
              if (
                Object.prototype.hasOwnProperty.call(this.data, val) &&
                !isEmptyString(this.data[val])
              ) {
                return { text: key, key: val, val: this.data[val], ...other, span }
              } else {
                return { text: key, key: val, val: '-', ...other, span }
              }
            })
            filterItems.push({ text: groupName, span: 4, isGroupName: true }, ...map)
          }
        })
      } else {
        this.items.forEach(({ groupName, items }) => {
          if (groupName && items.length > 0) {
            const map = items.map(({ key, val, ...other }, index) => {
              let span = 1
              if (index === items.length - 1) {
                span = 5 - (items.length % 4)
              }
              return { text: key, key: val, val: '-', ...other, span }
            })
            filterItems.push({ text: groupName, span: 4, isGroupName: true }, ...map)
          }
        })
      }
      // console.log(filterItems)
      return filterItems
    }
  },
  methods: {
    getQueryParameter: (val, row) => {
      return commonBusiness.getQueryParameter(val, row)
    },
    handleRedirect(config) {
      if (config && config.linkPath && config.linkProperty) {
        const { linkPath: path, linkProperty } = config
        const query = this.getQueryParameter(linkProperty, this.data)
        this.$router.push({ path, query })
      }
    }
  }
}
</script>
<style scoped>
.its-descriptions-group {
  padding: 20px;
  background: #fff;
}
</style>
