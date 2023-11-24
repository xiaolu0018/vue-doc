<template>
  <el-menu class="its-menu" v-bind="conf" v-on="$listeners">
    <its-menu-item
      v-for="item of data"
      :key="item[itemKey]"
      :item-key="itemKey"
      :item-props="itemProps"
      :item="item"
      :prefix="prefix"
    ></its-menu-item>
  </el-menu>
</template>

<script>
import ItsMenuItem from './MenuItem.vue'
export default {
  name: 'ItsMenu',
  components: {
    ItsMenuItem
  },
  props: {
    conf: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      required: true
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    itemProps: {
      type: Object,
      default: () => {}
    },
    prefix: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.its-menu {
  border-right: 0;
}
</style>
