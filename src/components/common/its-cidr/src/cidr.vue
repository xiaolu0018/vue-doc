<template>
  <div>
    <el-input v-model="form.block1" class="cidr-item" @change="handleChange"></el-input>
    <span class="cidr-sep">{{ separator }}</span>
    <el-input v-model="form.block2" class="cidr-item" @change="handleChange"></el-input>
    <span class="cidr-sep">{{ separator }}</span>
    <el-input v-model="form.block3" class="cidr-item" @change="handleChange"></el-input>
    <span class="cidr-sep">{{ separator }}</span>
    <el-input v-model="form.block4" class="cidr-item" @change="handleChange"></el-input>
    <span v-if="withMask" class="cidr-sep">/</span>
    <el-input
      v-if="withMask && customMask"
      v-model="form.mask"
      class="cidr-mask"
      @change="handleChange"
    ></el-input>
    <el-select
      v-if="withMask && !customMask"
      v-model="form.mask"
      class="cidr-mask2"
      @change="handleChange"
    >
      <el-option v-for="item of markList" :key="item" :value="item" :label="item"></el-option>
    </el-select>
  </div>
</template>
<script>
const updateCidrEvent = 'update:cidr'
const markList = [...new Array(32)].map((_, index) => index + 1)
export default {
  name: 'ItsCidr',
  props: {
    separator: {
      type: String,
      default: '.'
    },
    cidr: {
      type: String,
      default: ''
    },
    withMask: {
      type: Boolean,
      default: true
    },
    customMask: {
      // 是否手动输入掩码
      type: Boolean,
      default: true
    },
    maskStart: {
      // 掩码开始
      type: Number,
      default: 1
    },
    maskEnd: {
      // 掩码开始
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      regexp: /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})/,
      regexpWithoutMask: /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/,
      form: {
        block1: null,
        block2: null,
        block3: null,
        block4: null,
        mask: null
      },
      markList: markList
    }
  },
  watch: {
    cidr(val) {
      this.updateInputs(val)
    }
  },
  mounted() {
    this.updateInputs(this.cidr)
  },
  methods: {
    handleChange() {
      const { block1, block2, block3, block4, mask } = this.form
      if (this.withMask) {
        if (block1 && block2 && block3 && block4 && mask) {
          const localCidr =
            block1 +
            this.separator +
            block2 +
            this.separator +
            block3 +
            this.separator +
            block4 +
            '/' +
            mask
          this.$emit(updateCidrEvent, localCidr)
        } else {
          this.$emit(updateCidrEvent, '')
        }
      } else {
        if (block1 && block2 && block3 && block4) {
          const localCidr =
            block1 + this.separator + block2 + this.separator + block3 + this.separator + block4
          this.$emit(updateCidrEvent, localCidr)
        } else {
          this.$emit(updateCidrEvent, '')
        }
      }
    },
    updateInputs(val) {
      if (this.withMask) {
        this.markList = markList.filter((x) => x >= this.maskStart && x <= this.maskEnd)
        if (this.regexp.test(val)) {
          const [, block1, block2, block3, block4, mask] = this.regexp.exec(val)
          this.form = Object.assign({}, this.form, { block1, block2, block3, block4, mask })
        }
      } else {
        if (this.regexp.test(val)) {
          const [, block1, block2, block3, block4] = this.regexpWithoutMask.exec(val)
          this.form = Object.assign({}, this.form, { block1, block2, block3, block4, mask: null })
        }
      }
    },
    validatorCidr(value) {
      let msg = ''
      const val = value || this.cidr
      const ipAddr = val.replace(/\/.*$/, '').split('.')
      if (!ipAddr.every((ip) => +ip >= 0 && +ip <= 255)) {
        msg = 'ip 段范围必须要在 0-255 之间'
      }
      if (this.withMask) {
        const mask = +val.split('/')[1]
        if (!(mask >= 0 && mask <= 32)) {
          msg = '子网掩码必须在 0-32 之间'
        }
      }
      return { valid: msg === '', msg }
    }
  }
}
</script>
<style lang="scss" scoped>
.cidr-item {
  width: 55px;
}
.cidr-mask {
  width: 68px;
}
.cidr-mask2 {
  width: 88px;
}
.cidr-sep {
  margin: 0 5px;
}
</style>
