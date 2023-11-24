<template>
  <div v-if="data && data.length > 0" flex class="block-box">
    <template v-for="item in items">
      <div
        :key="item.val"
        flex="main:center cross:center"
        :class="['block-box-cell', item.val === localActive ? 'is-active' : '']"
        @click.prevent="handleClick(item.val)"
      >
        <span style="font-size: 12px">{{ item.key }}</span>
      </div>
    </template>
  </div>
</template>
<script>
import { safeRandom } from '@/utils/encrypt'
export default {
  name: 'ItsBlock',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localActive: 'rad'
    }
  },
  computed: {
    items() {
      const pre = { key: '随机分配', val: 'rad' }
      return [pre, ...this.data]
    },
    randomValue() {
      if (this.data.length > 0) {
        const entry = this.data[Math.floor(safeRandom() * this.data.length)]
        return entry.val
      }
      return ''
    }
  },
  watch: {
    data() {
      // if (this.localActive === 'rad') {
      //   this.updateActiveValue(this.randomValue);
      // }
      this.localActive = 'rad'
      this.updateActiveValue(this.randomValue)
    }
  },
  methods: {
    handleClick(val) {
      if (this.localActive === val) {
        return
      }
      this.localActive = val
      let tag = val
      if (val === 'rad') {
        tag = this.randomValue
      }
      this.updateActiveValue(tag)
      this.$emit('change', tag)
    },
    // 更新父组件active值
    updateActiveValue(newValue) {
      this.$emit('update:active', newValue)
    }
  }
}
</script>
<style lang="scss">
.block-box {
  width: 100%;
  margin: 0 -3px;
  flex-wrap: wrap;
  .block-box-cell {
    min-width: 100px;
    padding: 0 5px;
    margin: 3px;
    cursor: pointer;
    background-color: #f2f2f2;
  }
  .is-active {
    color: #fff;
    background-color: #2d8cf0;
  }
}
</style>
