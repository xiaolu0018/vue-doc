<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="img" />
    <i v-else class="el-icon-plus avatar-uploader-icon" aria-hidden="true"></i>
  </el-upload>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('input', res.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="scss">
.avatar-uploader {
  ::v-deep .el-upload {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed #ccc;
    border-radius: 6px;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  line-height: 178px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>
