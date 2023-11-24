<template>
  <div class="container">
    <div class="header">
      <span>{{ title }}</span>
    </div>
    <div class="content">
      <div v-for="(item, index) in items" :key="index" class="item">
        <div class="key">
          <span>{{ item.text }}</span>
        </div>
        <div class="val">
          <div>{{ item.val }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { commonBusiness } from '@/api/common'
export default {
  name: 'ItsDetailPanelItem',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleRedirect(config) {
      if (config && config.linkPath && config.linkProperty) {
        const { linkPath: path, linkProperty } = config
        const query = commonBusiness.getQueryParameter(linkProperty, this.data)
        this.$router.push({ path, query })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  .header {
    display: flex;
    height: 30px;
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #dcdfe6;
    align-items: center;
  }
  .content {
    display: flex;
    padding: 10px;
    font-size: 12px;
    color: #606266;
    border-bottom: 1px solid #dcdfe6;
    flex-direction: column;
    .item {
      display: flex;
      width: 100%;
      max-height: 100px;
      min-height: 20px;
      padding: 10px 0;
      border-bottom: 1px dashed #dcdfe6;
      .key {
        display: flex;
        width: 120px;
        border-right: 1px dashed #dcdfe6;
        align-items: center;
      }
      .val {
        display: flex;
        width: 160px;
        overflow: auto;
        word-break: normal;
        word-wrap: break-word;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .item:last-child {
      border-bottom: none;
    }
  }
}
</style>
