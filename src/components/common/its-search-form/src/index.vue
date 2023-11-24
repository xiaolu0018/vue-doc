<template>
  <el-form inline :model="form" @keyup.enter.native="localSearch">
    <div style="display: flex; flex-wrap: wrap; justify-content: flex-end">
      <div v-show="$slots.default && show" class="custom-form-item">
        <slot></slot>
      </div>
      <div>
        <template v-for="(entry, index) in localSelectEntries">
          <el-form-item :key="index" :prop="entry.prop">
            <el-select
              v-model="form[entry.prop]"
              clearable
              :filterable="entry.filterable"
              :placeholder="entry.description"
              style="width: 130px"
              @clear="onClear(entry.prop)"
            >
              <el-option
                v-for="{ key, val, disabled } in entry.options"
                :key="key"
                :label="val"
                :value="key"
                :disabled="disabled"
                @change="handleSelectChanged($event, entry.prop)"
              />
            </el-select>
          </el-form-item>
        </template>
      </div>
      <div>
        <template v-if="searchTypes.length">
          <template>
            <el-form-item>
              <el-select
                v-model="currentKey"
                placeholder="选择查询类型"
                style="width: 130px"
                clearable
                @clear="onClear(currentKey)"
              >
                <el-option
                  v-for="{ key, val } in searchTypes"
                  :key="key"
                  :label="key"
                  :value="val"
                />
              </el-select>
            </el-form-item>
          </template>
          <el-form-item>
            <el-input
              v-model="form[currentKey]"
              clearable
              placeholder="根据条件搜索"
              style="width: 200px"
              @input="filterEmojis"
            />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="localSearch">
            <i class="el-icon-search" aria-hidden="true" />
            查询
          </el-button>
        </el-form-item>
        <!-- <el-form-item v-if="showRefresh">
          <el-button @click="search">
            <i class="el-icon-refresh" aria-hidden="true" />
            刷新
          </el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="reset">
            <i class="el-icon-refresh-left" aria-hidden="true" />
            重置
          </el-button>
        </el-form-item>
        <small
          v-if="$slots.default"
          style="margin-right: 10px; line-height: 35px; cursor: pointer"
          @click="show = !show"
        >
          {{ !show ? '更多搜索' : '收起' }}
        </small>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {
  model: {
    prop: 'form',
    event: 'datachanged'
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    selectEntries: {
      type: Array,
      default: () => []
    },
    searchTypes: {
      type: Array,
      default: () => []
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    resetExclude: {
      type: Array,
      default() {
        return []
      }
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localSelectEntries: [],
      currentKey: '',
      show: false
    }
  },
  watch: {
    selectEntries: 'resetLocalSelectEntries',
    searchTypes: 'resetCurrentKey',
    currentKey: 'handlerKeyChange'
  },
  mounted() {
    // 从store中寻找查询条件，如果有，则用默认填充此条件
    if (this.persistent) {
      const formData = this.$store.getters['searchForm/getData'](this.$route.path)
      if (formData) {
        this.$emit('datachanged', formData)
      }
    }
    this.resetLocalSelectEntries(this.selectEntries)
    this.resetCurrentKey(this.searchTypes)
  },
  methods: {
    resetLocalSelectEntries(selectEntries) {
      this.localSelectEntries = Object.assign({}, selectEntries)
      // 当只有一个选项时，默认选择
      // selectEntries.forEach((entry) => {
      //   if (entry.options?.length === 1) {
      //     this.form[entry.prop] = entry.options[0].key
      //   }
      // })
    },
    resetCurrentKey(val) {
      this.currentKey = val.length === 1 ? val[0].val : void 0
    },
    localSearch() {
      const { searchType, searchText } = this.form
      if (!searchType && searchText) {
        this.$message.warning('请选择查询类型')
        return
      }
      this.$emit('local-search')
      // 将查询条件存储到store
      if (this.persistent) {
        const path = this.$route.path
        this.$store.dispatch('searchForm/setData', { path, form: this.form })
      }
    },
    search() {
      this.$emit('search')
    },
    reset() {
      const result = {}
      for (const key in this.form) {
        if (Object.prototype.hasOwnProperty.call(this.form, key)) {
          const element = this.form[key]
          if (this.resetExclude.includes(key) || ['searchType'].includes(key)) {
            this.$set(result, key, element)
            continue
          }
          if (typeof element === 'object' && element) {
            const value = Array.isArray(element) ? [] : {}
            this.$set(result, key, value)
          } else {
            delete result.key
            // this.$set(result, key, '')
          }
        }
      }
      this.$emit('datachanged', result)
      this.$emit('search')
    },
    handleSelectChanged(val, prop) {
      const result = JSON.parse(JSON.stringify(this.form))
      this.$set(result, prop, val)
      this.$emit('datachanged', result)
    },
    handlerKeyChange(val, pre) {
      // NOTE:searchType下拉清除时，删除form对应数据
      if (!val && pre) {
        const form = JSON.parse(JSON.stringify(this.form))
        delete form[pre]
        this.$emit('datachanged', form)
      }
    },
    onClear(prop) {
      delete this.form[prop]
    },
    filterEmojis() {
      const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u203C|\u2049|\u20E3|[\u2000-\u3300]/g
      this.form[this.currentKey] = this.form[this.currentKey].replace(regex, '').trim()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
::v-deep .custom-form-item .el-form-item.el-form-item--small {
  margin-bottom: 0;
}
</style>
