export const barBasic = {
  type: 'bar'
}
export const barType1 = {
  type: 'bar',
  showBackground: true,
  backgroundStyle: {
    color: 'rgba(180, 180, 180, 0.2)'
  }
}
export const barType2 = {
  type: 'bar',
  barWidth: '60%'
}
export const barType3 = (echarts) => ({
  type: 'bar',
  barWidth: '30px',
  itemStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#3B80E2' },
        { offset: 1, color: '#49BEE5' }
      ])
    }
  }
})

export const gradientRound = (echarts) => ({
  type: 'bar',
  barWidth: '15%',
  itemStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#fccb05'
        },
        {
          offset: 1,
          color: '#f5804d'
        }
      ]),
      barBorderRadius: 12
    }
  }
})
export const normal = {
  type: 'bar',
  barWidth: '15%',
  itemStyle: {
    normal: {
      barBorderRadius: 12
    }
  }
}
export const progressBar = (echarts) => ({
  type: 'bar',
  showBackground: true,
  backgroundStyle: {
    color: 'transparent',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#777',
    shadowBlur: 1
  },
  barWidth: 15,
  itemStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0.3, 0.5, [
      { offset: 0, color: '#321aec' },
      { offset: 1, color: '#d34839' }
    ]),
    borderRadius: 15,
    borderWidth: 8,
    borderColor: 'transparent'
  },
  emphasis: {
    borderRadius: 15,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: '#321aec' },
        { offset: 1, color: '#d34839' }
      ])
    }
  }
})
export const lineBasic = {
  type: 'line'
}

export const pieBasic = {
  type: 'pie',
  radius: '50%',
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
}
export const customCube = (echarts) => ({
  type: 'custom',
  renderItem: (params, api) => {
    const location = api.coord([api.value(0), api.value(1)])
    return {
      type: 'group',
      children: [
        {
          type: 'CubeLeft',
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3B80E2' },
              { offset: 1, color: '#49BEE5' }
            ])
          }
        },
        {
          type: 'CubeRight',
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3B80E2' },
              { offset: 1, color: '#49BEE5' }
            ])
          }
        },
        {
          type: 'CubeTop',
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3B80E2' },
              { offset: 1, color: '#49BEE5' }
            ])
          }
        }
      ]
    }
  }
})

const CubeLeft = (echarts) =>
  echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y + 9]
      const c1 = [shape.x - 9, shape.y]
      const c2 = [xAxisPoint[0] - 9, xAxisPoint[1]]
      const c3 = [xAxisPoint[0], xAxisPoint[1] + 9]
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath()
    }
  })
const CubeRight = (echarts) =>
  echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y + 9]
      const c2 = [xAxisPoint[0], xAxisPoint[1] + 9]
      const c3 = [xAxisPoint[0] + 18, xAxisPoint[1]]
      const c4 = [shape.x + 18, shape.y]
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath()
    }
  })
const CubeTop = (echarts) =>
  echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y + 9]
      const c2 = [shape.x + 18, shape.y]
      const c3 = [shape.x + 9, shape.y - 9]
      const c4 = [shape.x - 9, shape.y]
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath()
    }
  })

export default (echarts) => {
  echarts.graphic.registerShape('CubeLeft', CubeLeft(echarts))
  echarts.graphic.registerShape('CubeRight', CubeRight(echarts))
  echarts.graphic.registerShape('CubeTop', CubeTop(echarts))
  return {
    CubeLeft: CubeLeft(echarts),
    CubeRight: CubeRight(echarts),
    CubeTop: CubeTop(echarts),
    barBasic,
    barType1,
    barType2,
    barType3: barType3(echarts),
    gradientRound: gradientRound(echarts),
    progressBar: progressBar(echarts),
    normal,
    lineBasic,
    barBasic,
    customCube: customCube(echarts)
  }
}
