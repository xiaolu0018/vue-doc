/*
 * @Author: 庞超
 * @Date: 2022-06-14 11:09:00
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-11 22:31:15
 * @Description: 自定义条件
 * @FilePath: \src\src\utils\custom-condition.js
 */
import uniqueId from 'lodash/uniqueId'

class CustomCondition {
  /**
   * Custom Condition Constructor
   * @param { Array } conditionList 条件列表,允许外部传入一个列表，用于同步修改对象
   * @param { String } prefix Id 前缀
   */
  constructor(conditionList, prefix) {
    const isArray = Array.isArray(conditionList)
    this.conditionList = isArray ? conditionList : []
    this.prefix = prefix || 'custom-condition__'
  }
  /**
   * 生成ID
   * @returns { String } id
   */
  getId() {
    return uniqueId(this.prefix)
  }
  /**
   * 初始化时，如果要将一个数组恢复成响应式数据，需要遍历插入
   * @param { array } list
   * @returns { customCondition } 返回当前对象
   */
  observable(list) {
    if (!Array.isArray(list)) return this
    list.forEach((item) => this.conditionList.push({ id: this.getId(), ...item }))
    return this
  }
  /**
   * 新增一个自定义条件
   * @param { object } condition 初始条件对象
   * @returns { customCondition } 返回当前对象
   */
  add(condition) {
    const id = this.getId()
    const data = { id, ...condition }
    this.conditionList.push(data)
    return this
  }
  /**
   * 删除一个条件
   * @param { string } id condition id
   * @returns { customCondition } 返回当前对象
   */
  remove(id) {
    if (!id) return
    const idx = this.conditionList.findIndex((item) => item.id === id)
    this.conditionList.splice(idx, 1)
    return this
  }
  /**
   * 根据 ID 修改条件
   * @param { string } id condition id
   * @param { object } data 修改的数据
   * @returns { customCondition } 返回当前对象
   */
  update(id, data) {
    const item = this.findById(id)
    Object.keys(item).forEach((key) => {
      if (key === 'id' || data[key] === void 0) return
      item[key] = data[key]
    })
    return this
  }
  /**
   * 清空条件列表
   * @returns { customCondition } 返回当前对象
   */
  clear() {
    this.conditionList.splice(0)
    return this
  }
  /**
   * 根据 ID 查找条件
   * @param { string } id condition id
   * @returns { object } condition
   */
  findById(id) {
    return this.conditionList.find((item) => item.id === id)
  }
  /**
   * 获取自定义条件的个数
   * @returns { Number } 已添加条件的个数
   */
  size() {
    return this.conditionList.length
  }
}

const operations = [
  { id: 1, label: '>=', value: '>=' },
  { id: 2, label: '==', value: '=' },
  { id: 3, label: '<=', value: '<=' }
]

export { CustomCondition, operations }
