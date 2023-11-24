<script>
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
export default {
  name: 'ItsBtnGroup',
  props: {
    maxShowNum: {
      type: Number,
      default: 2,
      validator: function (value) {
        return value > 0
      }
    }
  },
  render(h) {
    const solt = this.$slots.default.filter((item) => !!item.tag)
    const { maxShowNum } = this
    if (solt.length < maxShowNum + 1) {
      return <div>{solt}</div>
    } else {
      const btnItem = solt.slice(0, maxShowNum - 1)
      const dropdownItem = solt.slice(maxShowNum - 1)
      return (
        <div>
          {btnItem}
          <Dropdown placement="bottom" class="its-ml-10">
            <el-button type="text">更多</el-button>
            <DropdownMenu slot="dropdown" class="btn-group-dropdown-menu">
              {dropdownItem.map((child) => {
                return <DropdownItem>{child}</DropdownItem>
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown-menu--small .el-dropdown-menu__item {
  padding: 0 !important;
}
</style>
<style lang="scss">
.btn-group-dropdown-menu {
  .el-button--text {
    display: block;
    width: 100%;
    padding: 7px 20px;
    text-align: left;
    box-sizing: border-box;
  }
}
</style>
