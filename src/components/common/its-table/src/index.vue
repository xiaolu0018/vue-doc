<script>
/**
 * 支持表格crud
 * @displayName its-table-p
 */
import { Table, TableColumn, Tooltip, Input, Popover, Button } from 'element-ui'
import { commonBusiness } from '@/api/common'
import router from '@/router'
import itsTableTag from '../components/its-table-tag.vue'
import { debounce } from 'lodash'
import { isNull } from '@/utils/unit'

const defaultTableHeight = '37px'
export default {
  name: 'ItsTableP',
  components: {
    itsTableTag
  },
  props: {
    /**
     * 表格首列类型, single 单选框；multiple 复选框；index 序列号
     * @values  single | multiple | index
     */
    type: {
      type: String,
      default: 'custom'
    },
    /**
     * 表格高度，启用 allowComputedHeight 计算高度后无效
     */
    height: [Number, String],
    /**
     * 表格配置参数，格式[{"name": "资源 ID","prop": "id", ...}, ...]
     */
    head: {
      type: Array,
      required: true
    },
    /**
     * 表格填充数据
     */
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * 表格分页配置对象
     */
    page: {
      type: Object,
      default: () => {
        return { pageSize: 15, pageNum: 1, isAsc: false, orderByString: '' }
      }
    },
    /**
     * 是否开启表格边框，拖拽必开，同 elementUI
     */
    border: {
      type: Boolean,
      default: false
    },
    /**
     * 表格loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 表格link类型column跳转路径，支持 /example/{param} 格式拼装参数
     */
    toPath: {
      type: String,
      default: ''
    },
    /**
     * 表格自定义合并方法，同element
     */
    spanMethod: {
      type: Function,
      default: () => {}
    },
    /**
     * 是否为斑马纹 table，同element
     */
    stripe: {
      type: Boolean,
      default: false
    },
    /**
     * 表格行className，同element
     */
    rowClassNameMethod: {
      type: [Function, String],
      default: function ({ row, rowIndex }) {
        return `el-table__row--${rowIndex % 3}`
      }
    },
    /**
     * 是否显示序号列，启用后自动寻址 $parent.page
     */
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    /**
     * 是否启用自动计算高度
     */
    allowComputedHeight: {
      type: Boolean,
      default: true
    },
    /**
     * 是否展开所有折叠表格
     */
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    /**
     * 表格主题色
     * @values white|dark
     */
    theme: {
      type: String,
      default: 'white'
    },
    /**
     * 渲染嵌套数据的配置选项
     */
    treeProps: {
      type: Object,
      default: () => {
        return { children: 'children', hasChildren: 'hasChildren' }
      }
    }
  },
  data() {
    this.computedBoxHeight = debounce(this.computedBoxHeight, 600)
    return {
      localData: {},
      tableHeight: defaultTableHeight
    }
  },
  computed: {
    tableData() {
      return this.data.map((m, index) => {
        return { ...m, rowIndex: index }
      })
    },
    textMaxLength() {
      const result = {}
      this.data.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'string') {
            if (result[key] === undefined) {
              result[key] = value.length
            } else {
              result[key] = Math.max(value.length, result[key])
            }
          }
        }
      })
      return result
    }
  },
  watch: {
    data: {
      handler() {
        this.boxHeight = defaultTableHeight
        this.computedBoxHeight()
      },
      deep: true
    }
  },
  mounted() {
    this.computedBoxHeight()
    // this.page = this.$parent.page
    window.addEventListener('resize', this.computedBoxHeight)
    // this.loadPagingData()
  },
  destroyed() {
    this.removeBoxHeightListener()
  },
  updated() {
    // 修复加入 index column 后第一列宽度不能正常设置的问题
    if (this.showIndexColumn) {
      this.doLayout()
    }
  },
  methods: {
    // 加载 page 分页数据，自动寻址
    // BUG: 如果一个页面有多个表格，但不是所有的表格都有分页器，那么会产生BUG
    loadPagingData() {
      if (!this.showIndexColumn) return
      let ele = this.$parent
      while (
        ele &&
        !ele.page &&
        ele.className !== 'app-main' &&
        ele.id !== 'app' &&
        ele.tagName !== 'BODY'
      ) {
        ele = ele.$parent
      }
      this.page = ele?.page || null
    },
    getQueryParameter: (val, row) => {
      return commonBusiness.getQueryParameter(val, row)
    },
    getToPath: (templateLinkPath, templateLinkPathColumn, row, toPath) => {
      if (templateLinkPathColumn && row[templateLinkPathColumn]) {
        return row[templateLinkPathColumn]
      }
      if (templateLinkPath) {
        toPath = templateLinkPath
      }
      const regex = /\{(\w+)\}/
      const regex_result = regex.exec(toPath)
      if (regex_result && regex_result.length > 0) {
        const prop = regex_result[1]
        return toPath.replace(regex, row[prop])
      }
      return toPath
    },
    handleLinkClick(templateLinkPath, templateLinkPathColumn, templateProperty, row, toPath) {
      router.push({
        path: this.getToPath(templateLinkPath, templateLinkPathColumn, row, toPath),
        query: this.getQueryParameter(templateProperty, row)
      })
    },
    handleSortChanged({ prop, order }) {
      this.$emit('sort-change', { prop, order })
    },
    handleExpandChanged({ prop, order }) {
      this.$emit('expand-change', { prop, order })
      this.computedBoxHeight()
    },
    handleRowDoubleClick(val) {
      this.$emit('row-dbclick', val)
    },
    handleCurrentChanged(val) {
      if (val) {
        if (this.type === 'single') {
          this.$refs['radio_' + val.rowIndex].checked = true
        }
        this.$emit('current-change', val)
      }
    },
    handleSelectionChanged(val) {
      this.$emit('selection-change', val)
    },
    selectRecords(ids, key = 'id') {
      if (ids && this.tableData && this.tableData.length > 0) {
        const rows = this.tableData.filter((item) => ids.includes(item[key]))
        rows.forEach((row) => {
          this.$refs['table'].toggleRowSelection(row, true)
        })
      }
    },
    handleCellEditClick(val) {
      const isPopoverVisable = Object.entries(this.localData).some(
        ([k, v]) => /popover_(.)+_(.)+_visible/.test(k) && !!v
      )
      if (isPopoverVisable) return
      const { visibleKey, valueKey, val: value } = val
      this.$set(this.localData, valueKey, value)
      this.$set(this.localData, visibleKey, true)
      this.$forceUpdate()
    },
    handleCellEditSubmit({ prop, value, visibleKey }, row, editType) {
      if (editType && editType === 'UnsignedNumber' && !/^\d+(.\d{1,6})?$/.test(value)) {
        this.$notify({
          title: '警告',
          message: '请输入正确的定价配置,小数点后最多6位!',
          type: 'warning'
        })
        return
      }
      this.$set(row, prop, value)
      /**
       * 触发表格cell编辑事件
       * @event cell-edit
       * @property {object} cellConfig { prop, value, visibleKey }
       * @property {number} row row data
       */
      this.$emit('cell-edit', { prop, value, visibleKey }, row)
      this.localData[visibleKey] = false
    },
    setCurrentRow(id, key = 'id') {
      if (id && this.tableData && this.tableData.length > 0) {
        const row = this.tableData.find((item) => id === item[key])
        if (row) {
          this.$refs.table.setCurrentRow(row)
        }
      }
    },
    doLayout() {
      this.$refs.table.doLayout()
    },
    removeBoxHeightListener() {
      window.removeEventListener('resize', this.computedBoxHeight)
      this.computedBoxHeight.cancel()
    },
    // 动态计算 table box 高度
    computedBoxHeight() {
      // remove listener
      if (this.height || !this.allowComputedHeight) {
        this.tableHeight = this.height
        this.removeBoxHeightListener()
        return
      }
      // data is empty
      if (this.data.length === 0) {
        this.tableHeight = '150px'
        return
      }
      const box = this.$refs.tableBox.parentElement
      // 容器上下padding -12 * 2
      const boxHeight = this.getComputedStyle(box, 'height') - 24
      // 如果父容器没有固定高度，则默认 100%
      // el-table mini 表头 33px, 为了避免特殊情况，将数值提升到 50px
      if (boxHeight <= 50) {
        this.tableHeight = '100%'
        return
      }
      // 边框高度预留 +2
      const tableHeight = this.getTableContentHeight() + 2
      this.tableHeight = (tableHeight > boxHeight ? boxHeight : tableHeight) + 'px'
    },
    // 获取 table 实际高度
    getTableContentHeight() {
      const table = this.$refs.table.$el
      const head = table.querySelector('.el-table__header')
      const body = table.querySelector('.el-table__body')
      const headHeight = this.getComputedStyle(head, 'height')
      const bodyHeight = this.getComputedStyle(body, 'height')
      return headHeight + bodyHeight
    },
    // 获取计算属性
    getComputedStyle(ele, style) {
      if (!ele || !(ele instanceof Element)) return 0
      const eleSty = ele?.currentStyle || window.getComputedStyle(ele)[style]
      return Number.parseInt(eleSty.replace('px', ''), 10)
    },
    getTableColumns(head) {
      const {
        toPath,
        localData,
        handleLinkClick,
        handleCellEditSubmit,
        handleCellEditClick,
        getToPath,
        textMaxLength
      } = this
      return head.map((m) => {
        const {
          prop,
          name,
          align,
          width,
          sortable,
          showToolTip = true,
          headerAlign,
          templateType,
          templateProperty,
          colorTagKey,
          templateLinkPath,
          templateLinkPathColumn,
          colorMap,
          isLink,
          isPopover,
          isEdit,
          editType,
          isArray,
          items = []
        } = m

        if (items && items.length > 0) {
          const childColumns = this.getTableColumns(items)
          return (
            <TableColumn label={name} align="center">
              {...childColumns}
            </TableColumn>
          )
        }
        /**
         * 加链接
         */
        // function createLink(itemContent, row) {
        //   return (
        //     <a
        //       style={{ cursor: 'pointer' }}
        //       on-click={() => {
        //         handleLinkClick(templateLinkPath, templateLinkPathColumn, templateProperty, row, toPath);
        //       }}
        //     >
        //       {itemContent}
        //     </a>
        //   );
        // }

        const dataColumnScopedSlots = {
          default: ({ row, $index }) => {
            let itemTemplate = null
            if (!!row[prop] || row[prop] === 0) {
              let itemContent = null
              // 可跳转链接
              const isLinkTpl =
                (isLink || templateType === 'link') &&
                !!templateProperty &&
                !!getToPath(templateLinkPath, templateLinkPathColumn, row, toPath)

              // 可配色tag
              const isColorTag = !!colorTagKey && !isNull(row[colorTagKey])
              // 进度条
              const isProgressTpl = templateType === 'progress'
              // 自定义插槽
              const isSlotScope = templateType === 'slotScope'
              if (isLinkTpl) {
                itemContent = (
                  <span>
                    <a
                      style={{
                        'font-size': '12px',
                        color: '#409eff',
                        cursor: 'pointer'
                      }}
                      on-click={() => {
                        handleLinkClick(
                          templateLinkPath,
                          templateLinkPathColumn,
                          templateProperty,
                          row,
                          toPath
                        )
                      }}
                    >
                      {row[prop]}
                    </a>
                  </span>
                )
              } else if (isColorTag) {
                const showIcon =
                  (isPopover || templateType === 'popover') &&
                  !!templateProperty &&
                  !!row[templateProperty]
                if (!isNull(row[prop])) {
                  itemContent = (
                    <its-table-tag
                      prop={row[prop.replace(/String|Name/, '')] || row[colorTagKey]}
                      text={row[prop]}
                      showIcon={showIcon}
                      textMaxLength={textMaxLength}
                    ></its-table-tag>
                  )
                } else {
                  itemContent = <span>{row[prop]}</span>
                }
              } else if (isProgressTpl) {
                itemContent = (
                  <el-progress percentage={row[prop] > 100 ? 100 : row[prop]}></el-progress>
                )
              } else if (isSlotScope) {
                itemContent = this.$scopedSlots[prop]?.({ row }) || row[prop]
              } else if (isArray && row[prop]) {
                if (row[prop] instanceof Array) {
                  itemContent = row[prop].map((content) => (
                    <span style={{ display: 'block' }}>{content}</span>
                  ))
                } else {
                  itemContent = [row[prop]].map((content) => (
                    <span style={{ display: 'block' }}>{content}</span>
                  ))
                }
              } else {
                itemContent = <span>{row[prop]}</span>
              }

              if (itemContent) {
                if (
                  (isPopover || templateType === 'popover') &&
                  !!templateProperty &&
                  !!row[templateProperty]
                ) {
                  const popoverConfig = {
                    props: {
                      'popper-class': 'popover-width',
                      effect: 'dark',
                      placement: 'top-start',
                      content: row[templateProperty]
                    }
                  }
                  const showIcon = !(
                    !!colorMap &&
                    !!colorTagKey &&
                    !!row[colorTagKey] &&
                    !!colorMap[row[colorTagKey]]
                  )
                  itemTemplate = (
                    <Tooltip {...popoverConfig}>
                      <span>
                        {itemContent}
                        {showIcon ? (
                          <span style="color:#66b1ff;vertical-align: middle;">
                            <i class="el-icon-s-comment" aria-hidden="true"></i>
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </Tooltip>
                  )
                } else {
                  itemTemplate = itemContent
                }
              } else {
                itemTemplate = <span>-</span>
              }
            } else {
              itemTemplate = <span>-</span>
            }
            // 序号列
            const isSerialNumber = templateType === 'serialNumber' && prop === 'serialNumber'
            if (isSerialNumber) {
              const { pageNum, pageSize } = this.page
              const pSize = pageNum === 1 ? 1 : pageSize
              return <span>{(pageNum - 1) * pSize + $index + 1}</span>
            }
            if (isEdit) {
              const visibleKey = `popover_${prop}_${row.rowIndex}_visible`
              const valueKey = `popover_${prop}_${row.rowIndex}_value`
              const editParam = {
                val: row[prop],
                visibleKey,
                valueKey
              }
              if (editType === 'UnsignedNumber') {
                return (
                  <span>
                    <span>
                      {itemTemplate}
                      <span style="position:absolute;right:1px;">
                        <Popover
                          placement="bottom-end"
                          title="修改值"
                          width="200"
                          trigger="manual"
                          v-model={localData[visibleKey]}
                        >
                          <div>
                            <Input min="0" v-model={localData[valueKey]}></Input>
                          </div>
                          <div style="text-align: right; margin-top: 10px;">
                            <Button type="text" on-click={() => (localData[visibleKey] = false)}>
                              取消
                            </Button>
                            <Button
                              type="primary"
                              on-click={() =>
                                handleCellEditSubmit(
                                  {
                                    prop,
                                    value: localData[valueKey],
                                    visibleKey
                                  },
                                  row,
                                  editType
                                )
                              }
                            >
                              确认
                            </Button>
                          </div>
                          <span
                            slot="reference"
                            style="cursor:pointer;"
                            on-click={() => handleCellEditClick(editParam)}
                          >
                            <i class="el-icon-edit-outline" aria-hidden="true"></i>
                          </span>
                        </Popover>
                      </span>
                    </span>
                  </span>
                )
              } else {
                return (
                  <span>
                    <span>
                      {itemTemplate}
                      <span style="position:absolute;right:1px;">
                        <Popover
                          placement="bottom-end"
                          title="修改值"
                          width="200"
                          trigger="manual"
                          v-model={localData[visibleKey]}
                        >
                          <div>
                            <Input v-model={localData[valueKey]}></Input>
                          </div>
                          <div style="text-align: right; margin-top: 10px;">
                            <Button type="text" on-click={() => (localData[visibleKey] = false)}>
                              取消
                            </Button>
                            <Button
                              type="primary"
                              on-click={() =>
                                handleCellEditSubmit(
                                  {
                                    prop,
                                    value: localData[valueKey],
                                    visibleKey
                                  },
                                  row
                                )
                              }
                            >
                              确认
                            </Button>
                          </div>
                          <span
                            slot="reference"
                            style="cursor:pointer;"
                            on-click={() => handleCellEditClick(editParam)}
                          >
                            <i class="el-icon-edit-outline" aria-hidden="true"></i>
                          </span>
                        </Popover>
                      </span>
                    </span>
                  </span>
                )
              }
            }
            return itemTemplate
          }
        }

        const itemData = {
          props: {
            key: prop,
            label: name,
            prop,
            align: align || 'left',
            headerAlign: headerAlign || align || 'left',
            width,
            minWidth: '120px',
            sortable: sortable ? 'custom' : false,
            showOverflowTooltip: showToolTip,
            className: isEdit ? 'table_column_style' : ''
          }
        }
        return <TableColumn {...itemData} scopedSlots={dataColumnScopedSlots}></TableColumn>
      })
    }
  },
  render(h) {
    const {
      type,
      head,
      border,
      rowKey,
      treeProps,
      defaultExpandAll,
      // height,
      stripe,
      tableData,
      spanMethod,
      rowClassNameMethod,
      getTableColumns,
      handleSortChanged,
      handleExpandChanged,
      handleRowDoubleClick,
      handleCurrentChanged,
      handleSelectionChanged,
      showIndexColumn
    } = this
    let typeColumn = null
    if (type === 'single') {
      const typeColumnScopedSlots = {
        default: ({ row }) => {
          return <input ref={'radio_' + row.rowIndex} type="radio" name="select" />
        }
      }
      typeColumn = <TableColumn width="50px" scopedSlots={typeColumnScopedSlots}></TableColumn>
    } else if (type === 'multiple') {
      typeColumn = (
        <TableColumn type="selection" selectable={(row) => !row.$selectable}></TableColumn>
      )
    } else if (type === 'index') {
      typeColumn = (
        <TableColumn type="index" column-key="id">
          <template slot="header">序号</template>
        </TableColumn>
      )
    }

    let dataColumn = null
    if (!!head && head.length > 0) {
      const serialNumberColumn = {
        name: '序号',
        prop: 'serialNumber',
        templateType: 'serialNumber',
        width: '60'
      }
      const newHead = this.page && showIndexColumn ? [serialNumberColumn, ...head] : head
      dataColumn = getTableColumns(newHead.filter((h) => !h.hide))
    }
    const tableConfig = {
      ref: 'table',
      props: {
        data: tableData,
        size: 'mini',
        highlightCurrentRow: type === 'single',
        border,
        stripe,
        spanMethod,
        rowClassName: rowClassNameMethod,
        ref: 'table',
        height: this.tableHeight,
        rowKey,
        treeProps,
        defaultExpandAll
      },
      on: {
        'sort-change': handleSortChanged,
        'expand-change': handleExpandChanged,
        'row-dblclick': handleRowDoubleClick,
        'current-change': handleCurrentChanged,
        'selection-change': handleSelectionChanged
      },
      style: {
        width: '100%'
      }
    }
    /**
     * @slot 操作栏插槽
     * @binding {object} row 行数据
     */
    return (
      <div
        ref="tableBox"
        class="table-wrap"
        v-loading={this.loading}
        element-loading-background={this.theme === 'dark' ? 'rgba(7, 16, 42, 0.9)' : '#fff'}
        element-loading-text="加载中，请稍后..."
      >
        <Table {...tableConfig} style={{ height: this.tableHeight }}>
          {typeColumn}
          {dataColumn}
          {this.$slots.default}
        </Table>
      </div>
    )
  }
}
</script>
<style lang="scss">
.table-wrap {
  height: 100%;
  padding: $padding;
  background: $white;
}
.table_column_style {
  position: relative;
  padding-right: 20px;
}
.el-table th > .cell {
  color: #505055;
}
</style>
