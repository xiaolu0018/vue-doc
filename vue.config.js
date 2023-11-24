const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        additionalData: `@import '~@/styles/variables.scss';`
      }
    }
  }
})
