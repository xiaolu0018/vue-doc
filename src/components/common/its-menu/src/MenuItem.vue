<script>
import qs from 'qs'

export default {
  name: 'ItsMenuItem',
  functional: true,
  props: {
    itemProps: {
      type: Object,
      default: () => {}
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    item: {
      type: Object,
      default: () => {}
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { item, itemKey, itemProps, prefix } = context.props
    const props = qs.stringify(itemProps)
    let index = props ? item[itemKey] + '?' + props : item[itemKey]
    index = prefix ? prefix + '/' + index : index
    if (!item) return
    if (item?.children?.length) {
      return (
        <el-submenu index={index}>
          <template slot="title">
            {item?.meta?.icon && <svg-icon icon-class={item?.meta?.icon} class="submenu-icon" />}
            <span>{item.title || item.meta.title}</span>
          </template>
          {item.children.map((child) => {
            return (
              <its-menu-item item={child} item-key={itemKey} item-props={itemProps}></its-menu-item>
            )
          })}
        </el-submenu>
      )
    } else {
      return (
        <el-menu-item index={index}>
          <template slot="title">
            {item?.meta?.icon && <svg-icon icon-class={item?.meta?.icon} class="submenu-icon" />}
            <span>{item.title || item.meta.title}</span>
          </template>
        </el-menu-item>
      )
    }
  }
}
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentColor;
}
.submenu-icon {
  margin-right: 5px;
}
</style>
