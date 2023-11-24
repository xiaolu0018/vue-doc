<!--
 * @Author: 庞超
 * @Date: 2022-07-07 16:08:31
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-09 10:21:18
 * @Description:
 * @FilePath: \src\src\components\common\its-chart\src\index.vue
-->
<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import { mergeOption } from './utils/main'
import chartsMixin from './mixins/charts-mixin'
import { graphic } from '@/utils/echarts'
export default {
  name: 'ItsChart',
  mixins: [chartsMixin],
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myChart: null,
      myChartOption: {}
    }
  },
  watch: {
    option: {
      handler(val) {
        this.initOption(val)
      },
      deep: true,
      immediate: true
    }
  },
  beforeMount() {
    this.setOptionName('myChartOption')
  },
  methods: {
    initOption(val = this.option) {
      if (val.data.length) {
        this.myChartOption = mergeOption({ graphic }, val)
        this.myChartOption && this.myChart?.setOption(this.myChartOption, true)
      }
    }
  }
}
</script>
