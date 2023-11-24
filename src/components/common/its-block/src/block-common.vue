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
export default {
  name: 'ItsBlock',
  props: {
    data: {
      type: Array,
      required: true
    },
    active: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    items() {
      return this.data
    },
    localActive: {
      get() {
        return this.active
      },
      set(val) {
        this.updateActiveValue(val)
      }
    }
  },
  methods: {
    handleClick(val) {
      if (this.localActive === val) {
        return
      }
      this.localActive = val
      this.$emit('change', this.localActive)
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
