export const axisStyle1 = {
  xAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  yAxis: {
    minInterval: 1,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  }
}
export const axisStyle2 = {
  xAxis: {
    axisLine: {
      show: true
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      interval: 0,
      color: '#999'
    }
  },
  yAxis: {
    minInterval: 1,
    axisLine: {
      show: true
    },
    splitLine: {
      show: true
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      color: '#999'
    }
  }
}
/**
 * y axisLine hidden
 */
export const axisStyle3 = {
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    }
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#DDD'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    nameTextStyle: {
      color: '#999'
    },
    splitArea: {
      show: false
    }
  },
  dataZoom: [
    {
      show: true,
      height: 12,
      xAxisIndex: [0],
      bottom: '10%',
      start: 10,
      end: 90,
      handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: '#d3dee5'
      },
      textStyle: {
        color: '#fff'
      },
      borderColor: '#90979c'
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ]
}
export const axisStyleNone = {
  xAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  yAxis: {
    minInterval: 1,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  }
}
export const axisStyleDouble = {
  xAxis: {
    axisLine: {
      show: true
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      color: '#999'
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '可用',
      min: 0,
      max: 5000,
      interval: 500,
      axisLine: {
        show: true
      },
      splitLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        color: '#999'
      }
    },
    {
      type: 'value',
      name: '已用',
      min: 0,
      max: 50,
      interval: 5,
      axisLine: {
        show: true
      },
      splitLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        color: '#999'
      }
    }
  ]
}
