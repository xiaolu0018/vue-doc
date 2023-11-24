<script>
import { Tooltip } from 'element-ui'
export default {
  name: 'ItsPwdViewer',
  props: {
    value: String
  },
  data() {
    return {
      flag: true
    }
  },
  render() {
    return (
      <div class="pwd-viewer">
        <Tooltip content={this.value} disabled={this.flag}>
          <span>{this.flag ? '******' : this.value}</span>
        </Tooltip>
        <div class="icon">
          <svg-icon
            icon-class={this.flag ? 'eye' : 'eye-open'}
            onClick={() => {
              this.flag = !this.flag
            }}
          />
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.pwd-viewer {
  display: flex;
  align-items: center;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    width: 40px;
    margin-left: 5px;
  }
}
</style>
