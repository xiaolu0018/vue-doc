module.exports = {
  // set your styleguidist configuration here
  // 说明文档标题
  title: '算网公共组件说明文档',
  // 需要被被添加说明的组件
  components: 'src/components/common/its-table/src/index.vue',
  // components: 'src/components/**/[A-Z]*.vue',
  // defaultExample: true,
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  // 忽略的组件
  ignore: ['src/components/**/example.vue'],
  version: '1.1.1',
  // styleguide:build 成的包名
  styleguideDir: 'styleguide-dist',
  // 在编辑器的右上角添加一个小按钮，用于将编辑器的内容复制到剪贴板
  copyCodeButton: true,
  // 是否每个章节是一个独立的页面. 默认:false
  pagePerSection: true,
  usageMode: 'expand',
  // 左侧导航默认是展开还是收缩: expand / collapse / hide
  tocMode: 'expand',
  // 显示 prop、事件、槽或方法是否来自当前文件或在 mixin 或扩展组件中配置。如果它是外部的，它会显示组件的名称，并在悬停时显示文件的相对路径。
  displayOrigins: true,
  exampleMode: 'expand'
}
