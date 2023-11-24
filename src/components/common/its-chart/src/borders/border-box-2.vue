<template>
  <div :ref="ref" class="dv-border-box-5">
    <svg
      :class="`dv-border-svg-container  ${reverse && 'dv-reverse'}`"
      :width="width"
      :height="height"
    >
      <polyline
        class="dv-bb5-line-1"
        :stroke="mergedColor[0]"
        :points="`1, 1 ${width - 1}, 1 ${width - 1}, ${height - height / 3}
          ${width - height / 3}, ${height - 1} 1, ${height - 1} 1, 1`"
      />
    </svg>
    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItsChartBorderBox2',
  props: {
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    }
  },
  data() {
    return {
      ref: 'border-box-5',
      defaultColor: ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)'],
      mergedColor: [],
      width: 0,
      height: 0
    }
  },
  watch: {
    color() {
      this.mergeColor()
    }
  },
  mounted() {
    this.mergeColor()
    this.initWH()
  },
  methods: {
    mergeColor() {
      this.mergedColor = [...this.color, ...this.defaultColor]
    },
    initWH() {
      this.$nextTick(() => {
        const dom = this.$refs[this.ref]
        this.width = dom ? dom.clientWidth : 0
        this.height = dom ? dom.clientHeight : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dv-border-box-5 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-reverse {
    transform: rotate(180deg);
  }

  .dv-border-svg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
    }
  }

  .dv-bb5-line-1,
  .dv-bb5-line-2 {
    stroke-width: 1;
  }

  .dv-bb5-line-3,
  .dv-bb5-line-6 {
    stroke-width: 5;
  }

  .dv-bb5-line-4,
  .dv-bb5-line-5 {
    stroke-width: 2;
  }

  .border-box-content {
    position: relative;
    padding: 5px;
    text-align: center;
  }
}
</style>
