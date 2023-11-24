<template>
  <div class="edit-cell" @click="onFieldClick">
    <el-tooltip
      v-if="!editMode && !showInput"
      :placement="toolTipPlacement"
      :open-delay="toolTipDelay"
      :content="toolTipContent"
    >
      <div
        tabindex="0"
        class="cell-content"
        :class="{ 'edit-enabled-cell': canEdit }"
        @keyup.enter="onFieldClick"
      >
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    <component
      :is="editableComponent"
      v-if="editMode || showInput"
      ref="input"
      v-model="model"
      class="edit-cell"
      :type="datatype"
      v-bind="$attrs"
      @focus="onFieldClick"
      @keyup.enter.native="onInputExit"
      v-on="listeners"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
export default {
  name: 'ItsEditableCell',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    datatype: {
      type: String,
      default: 'text'
    },
    toolTipContent: {
      type: String,
      default: '点击编辑'
    },
    toolTipDelay: {
      type: Number,
      default: 0
    },
    toolTipPlacement: {
      type: String,
      default: 'top-start'
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: 'el-input'
    },
    closeEvent: {
      type: String,
      default: 'blur'
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners
      }
    }
  },
  methods: {
    onFieldClick() {
      if (this.canEdit) {
        this.editMode = true
        this.$nextTick(() => {
          const inputRef = this.$refs.input
          if (inputRef && inputRef.focus) {
            inputRef.focus()
          }
        })
      }
    },
    onInputExit() {
      this.editMode = false
    },
    onInputChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style>
.cell-content {
  min-height: 28px;
  border: 1px solid transparent;
}
.edit-cell {
  min-height: 28px;
  padding: 0;
}

.edit-enabled-cell {
  /* height: 28px; */
  /* line-height: 28px; */
  /* border: 1px solid #DCDFE6; */
  /* border-radius: 4px; */
}
</style>
