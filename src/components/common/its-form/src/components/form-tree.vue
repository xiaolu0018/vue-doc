<template>
  <div class="dc-form-tree">
    <el-select
      ref="selectRef"
      style="width: 100%"
      :value="labels"
      :collapse-tags="collapseTags"
      :multiple="multiple"
      :clearable="clearable"
      placeholder="请输入内容"
      @clear="onClear"
    >
      <el-option :value="values" style="height: auto; padding: 0">
        <el-tree
          ref="tree"
          :data="data"
          :show-checkbox="showCheckbox"
          :props="defaultProps"
          node-key="id"
          style="width: 100%"
          :default-expand-all="defaultExpandAll"
          :default-expanded-keys="multiple ? [].concat(values) : [values]"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { isNonEmptyArray } from '@/utils/unit'
export default {
  props: {
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labels: [],
      values: [],
      defaultProps: {
        children: 'children',
        label: 'key'
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.$nextTick(() => {
          // if (isNonEmptyArray(val)) {
          // }
          this.values = this.value
        })
      },
      deep: true,
      immediate: true
    },
    data: {
      handler(val) {
        this.$nextTick(() => {
          if (isNonEmptyArray(val)) {
            if (!this.multiple) {
              const parent = val.find((v) => v.id === this.values)
              this.labels = parent ? parent.key : ''
              this.$refs.tree.setCurrentKey(this.values)
            } else {
              const getLabels = (data, values) => {
                if (!isNonEmptyArray(values)) return
                return values.reduce((res, cur) => {
                  const foo = (data, id) => {
                    data.forEach((d) => {
                      if (d.id === id) {
                        res.push(d.key)
                      } else {
                        if (isNonEmptyArray(d.children)) {
                          foo(d.children, id)
                        }
                      }
                    })
                  }
                  foo(data, cur)
                  return res
                }, [])
              }
              this.labels = getLabels(val, this.values)
              // 必须设置node-key="id"
              this.setNodeChecked(this.values)
            }
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleNodeClick(data) {
      if (this.showCheckbox) return
      this.labels = data.key
      this.values = data.val
      this.$emit('input', data.val)
      this.$refs.selectRef.blur() // 单选隐藏树
    },
    handleCheckChange() {
      const checkedNodes = this.$refs.tree?.getCheckedNodes(false, false)
      const halfcheckedNodes = this.$refs.tree?.getHalfCheckedNodes(false, false)

      const nodes = [...halfcheckedNodes, ...checkedNodes]

      const displayLabels = []
      const values = []
      nodes.forEach((c) => {
        displayLabels.push(c.key)
        values.push(c.val)
      })
      this.labels = displayLabels
      this.values = values
      this.$emit('input', values)
    },
    onClear() {
      this.labels = []
      this.values = []
      this.$emit('input', '')
    },
    setNodeChecked(nodes) {
      this.$nextTick(() => {
        nodes.forEach((item) => {
          const node = this.$refs.tree?.getNode(item)
          if (node?.isLeaf) {
            this.$refs.tree.setChecked(node, true)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-tree-node.is-expanded.is-current.is-focusable > .el-tree-node__content {
  background: #f2f2f2;
}
</style>
