<template>
  <div class="its-data-box-group">
    <el-row :gutter="15">
      <slot></slot>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.its-data-box-group {
  margin-top: 15px;
  margin-left: 10px;
}
</style>
