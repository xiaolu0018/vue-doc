<script>
import { Table, TableColumn, Input, Button, Select, Option, FormItem } from 'element-ui'
export default {
  name: 'ItsEditableTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    head: {
      type: Array,
      required: true
    },
    unique: {
      type: String,
      default: ''
    },
    // 对应表达prop 用于表单验证
    formProp: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localHead: this.head,
      isReload: true
    }
  },
  computed: {
    localData: {
      get() {
        return this.data
      },
      set(data) {
        this.$emit('update:data', data)
      }
    }
  },
  // watch: {
  //   head(val) {
  //     console.log(this.localData)
  //   }
  // },
  methods: {
    handleNewLocalDataRowCreateFromHead() {
      const props = this.localHead.map(({ prop }) => prop)
      if (props.length > 0) {
        const obj = {}
        props.forEach((e) => {
          this.$set(obj, e, '')
        })
        this.$set(obj, 'editing', true)
        return obj
      }
      return null
    },
    handleCreate() {
      if (this.unique) {
        const arr = this.localData.map((m) => m[this.unique])
        if (new Set(arr).size === arr.length && !arr.includes('')) {
          this.localData.forEach((e) => {
            e.editing && this.$delete(e, 'editing')
          })
          const record_new = this.handleNewLocalDataRowCreateFromHead()
          if (record_new) {
            this.localData.push(record_new)
          }
        }
      } else {
        const isEditing = this.localData.some((e) => e.editing)
        if (!isEditing) {
          const record_new = this.handleNewLocalDataRowCreateFromHead()
          if (record_new) {
            this.localData.push(record_new)
          }
        }
      }
    },
    handleRowDelete(index) {
      this.localData.splice(index, 1)
    },
    updateData(data) {
      this.$emit('update:data', data)
    },
    updateHeadDic(key, dicData, index) {
      this.localHead = this.localHead.map((d) => {
        if (d.prop === key) {
          d.dicData = dicData.map((d) => {
            return { key: d.dictValue, val: d.dictKey }
          })
        }
        return d
      })
      this.localData = this.localData.map((d, idx) => {
        // 只清空当前行
        if (idx === index) {
          d[key] = dicData[0].dictKey
        }
        return d
      })
      this.forceReload()
    },
    forceReload() {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
        // console.log('reloaded')
      })
    }
  },
  render(h) {
    const { localData, localHead, handleCreate, handleRowDelete, formProp, isReload } = this
    const data_column = localHead.map(
      ({ label, prop, width, type, rules, dicData, change, blur, disabled, min }, index) => {
        const column_prop = { props: { label, prop, width } }
        const state = { dicData }
        const data_column_scopedslots = {
          default: ({ row, $index }) => {
            if (row.editing) {
              return (
                <FormItem
                  rules={rules}
                  prop={`${formProp}.` + $index + `.${prop}`}
                  style="margin-top: 18px;"
                >
                  {() => {
                    switch (type) {
                      case 'select':
                        // if (dicData.length === 1) {
                        //   row[prop] = dicData[0].val
                        // }
                        return (
                          <Select
                            v-model={row[prop]}
                            disabled={disabled}
                            clearable
                            onChange={(val) => {
                              const row = state.dicData.find((d) => val === d.val)
                              const rowIndex = $index
                              row[`$${prop}`] = row.key
                              typeof change === 'function' && change(val, row, rowIndex)
                            }}
                          >
                            {Array.isArray(state.dicData) &&
                              state.dicData.map((d) => {
                                return <Option label={d.key} value={d.val}></Option>
                              })}
                          </Select>
                        )
                      case 'other':
                        return <span></span>
                      default:
                        return (
                          <Input
                            type={type || 'input'}
                            min={min}
                            v-model={row[prop]}
                            onBlur={(val) => {
                              typeof blur === 'function' && blur(val, row, $index)
                            }}
                          ></Input>
                        )
                    }
                  }}
                </FormItem>
              )
            } else {
              // $propName 为显示值
              return <span>{row[`$${prop}`] || row[prop]}</span>
            }
          }
        }
        return <TableColumn {...column_prop} scopedSlots={data_column_scopedslots}></TableColumn>
      }
    )

    const options_column_scopedslots = {
      header: () => {
        return (
          <Button icon="el-icon-plus" type="text" on-click={handleCreate}>
            新增
          </Button>
        )
      },
      default: ({ $index, row }) => {
        return (
          <div>
            <Button
              type="text"
              on-click={() => {
                const { editing, ...rest } = row
                const keys = Object.keys(rest).map((k) => `${formProp}.` + $index + `.${k}`)
                const tmp = []
                // NOTE:不能同时编辑两行//
                if (!row.editing && localData.find((ite) => ite.editing)) {
                  return
                }
                // 兼容2种写法
                const formRef =
                  typeof this.$parent.$parent.validateField === 'function'
                    ? this.$parent.$parent
                    : this.$parent.$parent.$parent
                if (!formRef) return
                const validateFields = () => {
                  formRef.validateField(keys, (cb) => {
                    tmp.push(cb)
                  })
                  const allFieldsValid = tmp.every((t) => !t)
                  allFieldsValid && this.$set(row, 'editing', !editing)
                }
                Object.keys(rest).forEach((key) => {
                  const head = this.localHead.find((d) => d.prop === key)
                  if (head && head.dicData) {
                    const dictData = head.dicData.find((d) => d.val === row[key])
                    if (dictData) {
                      this.$set(row, `$${key}`, dictData.key)
                    }
                  }
                })
                if (editing) {
                  validateFields()
                } else {
                  this.$set(row, 'editing', !editing)
                  this.$emit('rowEdit', {
                    row,
                    index: $index,
                    head: localHead
                  })
                }
              }}
            >
              {!row.editing ? '编辑' : '保存'}
            </Button>
            <Button
              style="color: #f56c6c"
              type="text"
              on-click={() => {
                handleRowDelete($index)
              }}
            >
              删除
            </Button>
          </div>
        )
      }
    }

    const options_column = (
      <TableColumn align="right" scopedSlots={options_column_scopedslots} width="120"></TableColumn>
    )

    return isReload ? (
      <Table border data={localData} v-loading={this.loading}>
        {data_column}
        {options_column}
      </Table>
    ) : (
      <div></div>
    )
  }
}
</script>
