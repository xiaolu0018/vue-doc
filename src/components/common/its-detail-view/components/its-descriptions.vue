<script>
import { Descriptions, DescriptionsItem, Tooltip } from 'element-ui'
import { commonBusiness } from '@/api/common'
import ItsPwdViewer from './its-pwd-viewer.vue'
export default {
  name: 'ItsDescriptions',
  props: {
    items: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    column: {
      type: Number,
      default: 4
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    getQueryParameter: (val, row) => {
      return commonBusiness.getQueryParameter(val, row)
    },
    handleRedirect(config) {
      if (config && config.linkPath && config.linkProperty) {
        const { linkPath: path, linkProperty } = config
        const query = this.getQueryParameter(linkProperty, this.data)
        this.$router.push({ path, query })
      }
    },
    getItems() {
      const { items, data, handleRedirect } = this
      return items.map((item) => {
        const {
          text: label,
          color,
          colorMap,
          colorProperty,
          linkConfig,
          tooltipProperty,
          val,
          isGroupName,
          span,
          type
        } = item
        if (isGroupName) {
          return (
            <DescriptionsItem
              labelClassName="its-descriptions-title-label"
              label={label}
              span={span}
            ></DescriptionsItem>
          )
        }
        let defauleSlots = null
        let defaultSlot = null
        const isTooltip = val && val !== '-'
        if (linkConfig && !!linkConfig.linkPath && !!linkConfig.linkProperty && val !== '-') {
          let linkColor = '#409eff'
          if (color) {
            linkColor = color
          } else if (colorMap && colorMap[data[colorProperty] || val]) {
            linkColor = colorMap[data[colorProperty] || val]
          }
          defaultSlot = (
            <el-link
              on-click={() => {
                handleRedirect(linkConfig)
              }}
              style={{
                color: linkColor,
                fontSize: '12px'
              }}
            >
              {val}
              {isTooltip ? <i class="el-icon-info el-icon--right" aria-hidden="true" /> : ''}
            </el-link>
          )
        } else {
          let tagColor = ''
          if (color) {
            tagColor = color
          } else if (colorMap && colorMap[data[colorProperty] || val]) {
            tagColor = colorMap[data[colorProperty] || val]
          }
          defaultSlot = (
            <span
              style={{
                color: tagColor
              }}
            >
              {val}
            </span>
          )
        }
        if (isTooltip) {
          defauleSlots = (
            <Tooltip>
              <template slot="content">{val}</template>
              {defaultSlot}
            </Tooltip>
          )
        } else {
          defauleSlots = defaultSlot
        }

        if (type === 'password') {
          defauleSlots = <ItsPwdViewer value={val}></ItsPwdViewer>
        }

        return (
          <DescriptionsItem
            span={span}
            label={label}
            labelClassName="its-descriptions-label"
            contentClassName="its-description-content"
          >
            {defauleSlots}
          </DescriptionsItem>
        )
      })
    }
  },
  render(h) {
    const { getItems, title, column } = this
    return (
      <Descriptions title={title} column={column} border>
        {getItems()}
      </Descriptions>
    )
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-descriptions__title {
  font-size: 14px;
  font-weight: normal;
}
::v-deep .el-descriptions__header {
  margin-bottom: 15px;
}
::v-deep .el-descriptions-item__label.is-bordered-label {
  max-width: 100px;
  color: #606266;
}
</style>
<style lang="scss">
.its-descriptions-title-label {
  padding: 10px !important;
  font-size: 14px !important;
  font-weight: bold !important;
  color: #2c2d2d !important;
  background-color: #fff !important;
  border-right: 0 !important;

  & + td {
    border-left: 0 !important;
  }
}

.its-descriptions-label {
  position: relative;
  color: #696969 !important;

  // &::before {
  //   position: absolute;
  //   top: 10%;
  //   left: 0;
  //   display: block;
  //   width: 2px;
  //   height: 80%;
  //   background: rgba(1, 126, 250, 0.7);
  //   content: '';
  // }
}

.its-description-content {
  max-width: 10em;
  overflow: hidden;
  color: #363636 !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
