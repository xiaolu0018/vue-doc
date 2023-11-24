<template>
  <el-dialog
    :title="title"
    :visible.sync="changeDialogVisible"
    :close-on-click-modal="closable"
    :show-close="closable"
    :append-to-body="appendToBody"
    :width="width"
    :custom-class="customClass"
    @closed="handleDialogClosed"
  >
    <template v-if="isShow">
      <component
        :is="name"
        ref="dialog_component"
        :param="param"
        :dialog-page.sync="page"
        :style="contentCls"
        @keyup.enter.native="enterSubmit && handleSubmit"
        @updateTitle="handleChangeTitle"
      ></component>
    </template>
    <template v-if="!viewOnly" #footer>
      <div flex="main:center cross:center">
        <div>
          <el-button v-show="closable" @click="handleCancel">取 消</el-button>
          <el-button v-if="showPrevStep" @click="handlePrevStep">上一步</el-button>
          <el-button type="primary" :loading="commitLoading" @click="handleSubmit">
            {{ localCommitContent }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { DIALOG_COLSE } from '@/constant'
export default {
  name: 'ItsDialog',
  data() {
    return {
      changeDialogVisible: false,
      title: '请填写表单',
      width: '45%',
      name: '',
      param: {},
      isShow: true,
      commitContent: '确 认',
      page: {
        count: 1,
        actived: 1
      },
      methodPromise: null,
      viewOnly: false,
      contentCls: {},
      appendToBody: false,
      enterSubmit: false,
      verifyLoading: false,
      loading: false,
      loadingDelay: 0,
      closable: true,
      customClass: undefined
    }
  },
  computed: {
    localCommitContent() {
      const { count, actived } = this.page
      return actived === count ? this.commitContent : '下一步'
    },
    showPrevStep() {
      const { actived } = this.page
      return actived > 1
    },
    commitLoading() {
      return this.verifyLoading || this.loading
    }
  },
  methods: {
    open({
      title,
      name,
      param,
      method,
      viewOnly,
      contentCls,
      appendToBody,
      confirmButtonText,
      loadingDelay = 0,
      closable = true,
      width = '45%',
      customClass
    }) {
      this.title = title
      this.name = name
      this.param = param || {}
      this.width = width
      this.methodPromise = method
      this.viewOnly = !!viewOnly
      this.contentCls = contentCls || {}
      this.customClass = customClass || undefined
      this.appendToBody = !!appendToBody
      this.commitContent = confirmButtonText || '确 认'
      this.loadingDelay = loadingDelay
      this.changeDialogVisible = true
      this.page = Object.assign({}, this.page, { count: 1, actived: 1 })
      this.closable = closable

      return new Promise((resolve, reject) => {
        this.$once(DIALOG_COLSE, ({ success, result, error }) => {
          if (success) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      })
    },
    handleDialogClosed() {
      this.title = ''
      this.name = ''
      this.param = {}
      this.width = '30%'
      this.methodPromise = null
      this.viewOnly = false
      this.contentCls = {}
      this.appendToBody = false
      this.commitContent = '确 认'
      this.$off(DIALOG_COLSE)
    },
    handlePrevStep() {
      let { actived } = this.page
      if (actived > 1) {
        actived--
        this.page = Object.assign({}, this.page, { actived })
        this.$refs.dialog_component.clearValidate()
      }
    },
    handleSubmit() {
      let { actived } = this.page
      const { count } = this.page
      const result = this.$refs.dialog_component.submit()
      if (actived === count) {
        if (result instanceof Promise) {
          this.verifyLoading = true
          result
            .then((res) => {
              if (this.methodPromise) {
                this.loading = true
                this.methodPromise(res)
                  .then((val) => {
                    if (val) {
                      this.$emit(DIALOG_COLSE, {
                        success: true,
                        result: val,
                        error: null
                      })
                      this.changeDialogVisible = false
                    }
                  })
                  .finally(() => this.handleLoadingClose())
              } else {
                this.$emit(DIALOG_COLSE, {
                  success: true,
                  result: res,
                  error: null
                })
                this.changeDialogVisible = false
              }
            })
            .catch((err) => {
              console.error(err)
            })
            .finally(() => (this.verifyLoading = false))
        } else {
          if (result) {
            if (this.methodPromise) {
              this.loading = true
              this.methodPromise(result)
                .then((val) => {
                  this.$emit(DIALOG_COLSE, {
                    success: true,
                    result: val,
                    error: null
                  })
                  this.changeDialogVisible = false
                })
                .catch((err) => {
                  console.error(err)
                })
                .finally(() => this.handleLoadingClose())
            } else {
              this.$emit(DIALOG_COLSE, {
                success: true,
                result,
                error: null
              })
              this.changeDialogVisible = false
            }
          }
        }
      } else if (actived < count) {
        const result = this.$refs.dialog_component.stepValidation()
        this.verifyLoading = true
        result
          .then(() => {
            actived++
            this.page = Object.assign({}, this.page, { actived })
          })
          .catch((err) => {
            console.warn(err)
          })
          .finally(() => (this.verifyLoading = false))
      }
    },
    handleCancel() {
      this.$emit(DIALOG_COLSE, {
        success: false,
        result: null,
        error: 'cancel'
      })
      this.changeDialogVisible = false
    },
    reload() {
      this.isShow = false
      this.$nextTick(() => (this.isShow = true))
    },
    handleLoadingClose() {
      if (this.loadingDelay) {
        setTimeout(() => (this.loading = false), this.loadingDelay)
      } else {
        this.loading = false
      }
    },
    handleChangeTitle(newTitle) {
      this.title = newTitle
    }
  }
}
</script>
