<script>
import { Container, Footer, Main } from 'element-ui'
import Breadcrumb from '@/layout/components/Breadcrumb'
export default {
  name: 'ItsContainer',
  props: {
    additionalRoute: {
      type: Array,
      default: () => []
    },
    additionalIndex: {
      type: Number,
      default: null
    },
    extraRoute: {
      // 额外的路由参数，被插入面包屑倒数第二级
      type: Array,
      default: () => []
    },
    // 新增/详情是否公用route
    isShareRoute: {
      type: Boolean,
      default: false
    },
    // its-container 嵌套，隐藏默认header
    nested: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasHeader() {
      return !!this.$slots.header
    },
    hasFilter() {
      return !!this.$slots.filter
    },
    hasSubmenu() {
      return !!this.$slots.submenu
    },
    hasFooter() {
      return !!this.$slots.footer
    }
  },
  render(h) {
    const layout = []
    // breadcrumb + 搜索 + 批量操作
    const headerRow = (
      <div class="common-header">
        <Breadcrumb
          additional-route={this.additionalRoute}
          additional-index={this.additionalIndex}
          is-share-route={this.isShareRoute}
          extra-route={this.extraRoute || []}
        />
        {this.hasHeader && <div class="common-header-search">{this.$slots.header}</div>}
      </div>
    )
    const filterRow = <div class="common-filter">{this.$slots.filter}</div>
    const mainRow = <Main class="main">{this.$slots.default}</Main>
    const footRow = (
      <Footer class="footer" flex="cross:center" height="50px">
        {this.$slots.footer}
      </Footer>
    )

    layout.push(headerRow)

    if (this.hasFilter) {
      layout.push(filterRow)
    }
    layout.push(mainRow)
    if (this.hasFooter) {
      layout.push(footRow)
    }
    if (this.hasSubmenu) {
      return (
        <Container class={['container', this.nested ? 'nested' : '']}>
          <div class="common-subtree">{this.$slots.submenu}</div>
          <Container class="container" direction="vertical">
            {...layout}
          </Container>
        </Container>
      )
    } else {
      return (
        <Container class="container" direction="vertical">
          {...layout}
        </Container>
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .common-header {
    position: relative;
    z-index: 0;
    display: flex;
    padding: 5px 0;
    background-color: $white;
    // border-bottom: 1px solid $border-color;
    box-shadow: $shadow-sm;
    justify-content: space-between;
    flex-wrap: wrap;
    &-search {
      display: flex;
      margin: 0 $padding;
      // flex: 1;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .main {
    padding: $padding;
    overflow: auto;
    background-color: $main-bg;
  }
  .common-subtree {
    position: relative;
    z-index: 1;
    width: 200px;
    overflow-x: hidden;
    background-color: $white;
    flex: none;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }
  // .common-filter {
  //   // background-color: $white;
  // }
  .footer {
    line-height: 0;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
  }

  &.nested {
    & > .is-vertical > .common-header {
      display: none;
    }
    & > .container {
      & > .main {
        padding: 0;
      }
    }
  }
}

::v-deep .el-tree {
  background: transparent;
}
</style>
