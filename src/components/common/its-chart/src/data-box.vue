<template>
  <el-col :span="4">
    <div
      class="its-data-box"
      :class="{ 'cursor-pointer': !!option.path }"
      @click="goto(option.path)"
    >
      <div class="icon">
        <svg-icon :icon-class="`${option.icon || 'user'}`" />
        <!-- <i :class="`el-icon el-icon-${option.icon || 'user'}`"></i> -->
      </div>
      <div class="content">
        <div class="label">{{ option.label }}</div>
        <div
          v-if="!Array.isArray(boxValue(option))"
          class="value"
          :title="`${boxValue(option)} ${boxUnit(option)}`"
        >
          {{ boxValue(option) }}
          <span class="unit">
            {{ unit || boxUnit(option) }}
          </span>
        </div>
        <template v-else>
          <div
            class="value"
            :title="`${boxValue(option)[0].val}${boxValue(option)[0].unit}/${
              boxValue(option)[1].val
            }${boxValue(option)[1].unit}`"
          >
            <template v-for="(item, index) of boxValue(option)">
              <span :key="index">
                {{ item.val }}
                <span class="unit">
                  {{ item.unit }}
                </span>
                <span v-if="index === 0">/</span>
              </span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </el-col>
</template>
<script>
import { getUnit } from '@/utils/unit'
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    // 强制单位
    unit: {
      type: String,
      default: ''
    }
  },
  computed: {
    boxUnit() {
      return function (option) {
        switch (option.label) {
          case '磁盘':
            return getUnit('disk', option.value[1]).unit
          case '存储':
            return getUnit('disk', option.value[1]).unit
          case '对象存储':
            return getUnit('oss', option.value).unit
          case '带宽':
            return getUnit('bandwidth', option.value[1]).unit
          default:
            return option.unit || ''
        }
      }
    },
    boxValue() {
      return function (option) {
        switch (option.label) {
          case '磁盘':
            return this.getValueByType(option, 'disk')
          case '存储':
            return this.getValueByType(option, 'disk')
          case '对象存储':
            return this.getValueByType(option, 'oss')
          case '带宽':
            return this.getValueByType(option, 'bandwidth')
          default:
            return Array.isArray(option.value)
              ? `${option.value[0]} / ${option.value[1]}`
              : option.value
        }
      }
    }
  },
  methods: {
    getValueByType(option, type) {
      return Array.isArray(option.value)
        ? [getUnit(type, option.value[0]), getUnit(type, option.value[1])]
        : getUnit(type, option.value).val
    },
    goto(path) {
      if (!path) return
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.its-data-box {
  display: flex;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  color: #777;
  background: #fff;
  box-shadow: 0 0 3px 0 #ddd;
  justify-content: space-between;
  &.cursor-pointer {
    cursor: pointer;
  }
  .icon {
    display: flex;
    align-items: center;
    i,
    svg {
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .content {
    overflow: hidden;
    text-align: right;
    .label {
      margin-bottom: 15px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .value {
      overflow: hidden;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 600;
      color: #444;
      text-overflow: ellipsis;
      white-space: nowrap;
      .unit {
        font-size: 12px;
        font-weight: normal;
        color: #777;
      }
    }
  }
}
@media screen and (min-width: 1700px) {
  .its-data-box {
    padding: 20px 25px;
    .icon {
      i,
      svg {
        font-size: 30px;
      }
    }
    .content {
      .label {
        font-size: 1rem;
      }
      .value {
        font-size: 1.3rem;
      }
    }
  }
}
</style>
