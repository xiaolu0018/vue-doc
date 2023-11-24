## 公共组件说明文档

### its-table

1. 属性

   | 参数 | 说明 | 类型 | 可选值 | 默认值 |
   | --- | --- | --- | --- | --- |
   | type | 表格首列类型,single 单选框；multiple 复选框；index 序列号 | string | single\|multiple\|index | custom |
   | height | 表格高度，启用 allowComputedHeight 计算高度后无效 | string\|number | - | - |
   | border | 是否开启表格边框，拖拽必开，同 elementUI | boolean | - | false |
   | loading | 表格 loading | boolean | - | false |
   | head | 表格配置参数，[{"name": "资源 ID","prop": "id", ...}, ...] | Array<columnConfig> | - | [] |
   | data | 表格填充数据 | array | - | [] |

2. 方法
3. 事件
