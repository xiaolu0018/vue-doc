<script>
import { Drawer, Button } from 'element-ui'
import { DRAWER_COLSE } from '@/constant'
export default {
  name: 'ItsDrawer',
  provide() {
    return {
      cancel: this.handleCancel
    }
  },
  data() {
    return {
      title: '',
      name: '',
      width: '700px',
      param: {},
      visible: false,
      direction: 'rtl', // rtl / ltr / ttb / btt
      commitContent: '确 认',
      methodPromise: null,
      viewOnly: false,
      verifyLoading: false,
      loading: false,
      loadingDelay: 0,
      submitRenderer: null,
      response: null // 最终响应
    }
  },
  computed: {
    commitLoading() {
      return this.verifyLoading || this.loading
    }
  },
  methods: {
    open({
      title,
      name,
      param,
      width,
      direction,
      method,
      viewOnly,
      confirmButtonText,
      loadingDelay,
      submitRenderer
    }) {
      if (!name) {
        console.warn('[ItsDrawer]: name为空')
        return
      }
      if (title) {
        this.title = title
      }
      this.name = name
      if (param) {
        this.param = param
      }
      if (width) {
        this.width = width
      }
      if (direction) {
        this.direction = direction
      }
      if (method) {
        this.methodPromise = method
      }
      if (viewOnly) {
        this.viewOnly = true
      }
      if (confirmButtonText) {
        this.commitContent = confirmButtonText
      }
      if (loadingDelay) {
        this.loadingDelay = loadingDelay
      }
      if (submitRenderer) {
        this.submitRenderer = submitRenderer
      }
      this.visible = true
      return new Promise((resolve, reject) => {
        this.$once(DRAWER_COLSE, ({ success, result, error }) => {
          if (success) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      })
    },
    getSubmitData(data) {
      if (this.$refs.customRef.getSubmitData) {
        return this.$refs.customRef.getSubmitData()
      }
      return data
    },
    sendSuccess(data) {
      this.response = Object.assign({}, this.response, {
        success: true,
        result: this.getSubmitData(data),
        error: null
      })
      this.$refs.drawerRef.closeDrawer()
    },
    sendFailed(error) {
      this.response = Object.assign({}, this.response, {
        success: false,
        result: null,
        error
      })
      this.$refs.drawerRef.closeDrawer()
    },
    clearValidate() {
      if (!this.$refs.customRef) {
        return
      }
      const customRefs = this.$refs.customRef.$refs
      const refKey = Object.keys(customRefs).find((f) => customRefs[f].$el.tagName === 'FORM')
      if (refKey) {
        customRefs[refKey].clearValidate()
      }
    },
    validate() {
      if (!this.$refs.customRef) {
        return Promise.reject(new Error())
      }
      return new Promise((resolve, reject) => {
        const customRefs = this.$refs.customRef.$refs
        const refKey = Object.keys(customRefs).find((f) => customRefs[f].$el.tagName === 'FORM')
        if (refKey) {
          const { rules, validate } = customRefs[refKey]
          if (rules) {
            validate((valid) => resolve(valid))
          } else {
            resolve(true)
          }
        } else {
          reject(new Error())
        }
      })
    },
    handleSave() {
      if (!this.$refs.customRef) return
      if (this.$refs.customRef.$refs && Object.keys(this.$refs.customRef.$refs).length > 0) {
        const customRefs = this.$refs.customRef.$refs
        const refKey = Object.keys(customRefs).find((f) => customRefs[f].$el.tagName === 'FORM')
        if (refKey) {
          const { model, rules, validate } = customRefs[refKey]
          let validateResult = false
          if (rules) {
            validate((valid) => {
              if (valid) {
                validateResult = true
              }
            })
          } else {
            validateResult = true
          }
          if (validateResult) {
            if (this.methodPromise) {
              if (this.methodPromise instanceof Promise) {
                this.methodPromise(model).then((res) => {
                  this.sendSuccess(res)
                })
              } else {
                this.sendSuccess(this.methodPromise(model))
              }
            } else {
              this.sendSuccess(model)
            }
          }
        }
      } else if (Object.prototype.hasOwnProperty.call(this.$refs.customRef, 'form')) {
        this.sendSuccess(this.$refs.customRef.form)
      }
    },
    handleCancel() {
      this.response = null
      this.$refs.drawerRef.closeDrawer()
    },
    handleVisibleUpdate(val) {
      this.visible = val
    },
    handleBeforeClose(done) {
      if (this.response) {
        this.$emit(DRAWER_COLSE, this.response)
      }
      done()
    },
    handleClosed() {
      this.title = ''
      this.name = ''
      this.param = {}
      this.width = '700px'
      this.direction = 'rtl'
      this.methodPromise = null
      this.viewOnly = false
      this.commitContent = '保存'
      this.loadingDelay = 0
      this.submitRenderer = null
      this.$off(DRAWER_COLSE)
    },
    handleLoadingClose() {
      if (this.loadingDelay) {
        setTimeout(() => (this.loading = false), this.loadingDelay)
      } else {
        this.loading = false
      }
    }
  },
  render(h) {
    const {
      title,
      name,
      param,
      visible,
      width,
      direction,
      viewOnly,
      submitRenderer,
      handleSave,
      handleCancel,
      handleVisibleUpdate,
      handleBeforeClose,
      handleClosed
    } = this
    let option = {
      visible,
      appendToBody: true,
      closeOnPressEscape: false,
      wrapperClosable: true,
      direction,
      destroyOnClose: true,
      beforeClose: handleBeforeClose,
      size: width
    }
    const custom = h(name, {
      ref: 'customRef',
      props: {
        param
      }
    })
    const submitRendererResult = submitRenderer ? (
      submitRenderer(h, param, (val) => (this.param = Object.assign({}, param, val)))
    ) : (
      <Button type="primary" on-click={handleSave}>
        保存
      </Button>
    )
    let titleSlot = null
    if (title) {
      if (!viewOnly) {
        option = Object.assign({}, option, { showClose: false })
        titleSlot = (
          <div slot="title" flex="main:justify cross:center">
            <span style={{ 'font-size': '18px', 'font-weight': 'bold', color: '#303133' }}>
              {title}
            </span>
            <div flex>
              <Button on-click={handleCancel}>取消</Button>
              {submitRendererResult}
            </div>
          </div>
        )
      } else {
        option = Object.assign({}, option, { title })
      }
    } else {
      option = Object.assign({}, option, { withHeader: false, wrapperClosable: true })
    }
    const drawer_conf = {
      ref: 'drawerRef',
      props: option,
      on: {
        'update:visible': handleVisibleUpdate,
        closed: handleClosed
      }
    }
    return (
      <Drawer {...drawer_conf}>
        {titleSlot}
        {custom}
      </Drawer>
    )
  }
}
</script>
