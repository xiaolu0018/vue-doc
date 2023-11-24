/*
 * @Author: 庞超
 * @Date: 2022-06-22 19:09:46
 * @LastEditors: 庞超
 * @LastEditTime: 2023-05-10 01:56:56
 * @Description: 数据持久层
 * @FilePath: /src/src/utils/storage.js
 */
class Storage {
  /**
   * 初始化参数
   * @param { String } namespace 命名空间
   */
  constructor(namespace) {
    this.namespace = namespace || '__DCITS__STORAGE__'
    // 浏览器是否支持 localStorage
    this.enable = 'Not-verified'
  }

  /**
   * 校验浏览器是否支持 localStorage
   * @param { Object } storage window.localStorage 对象
   * @returns { Boolean }
   */
  testStorage(storage) {
    if (!storage) return false
    const testStr = '__DCITS_TEST_LOCALSTORAGE__'
    try {
      storage.setItem(testStr, testStr)
      const isOK = testStr === storage.getItem(testStr)
      storage.removeItem(testStr)
      return isOK
    } catch (err) {
      return false
    }
  }

  /**
   * 初始化 localStorage 实例
   * @returns { Object } window.localStorage
   */
  storage() {
    const store = window.localStorage

    // 不重复校验
    if (this.enable !== 'Not-verified' && this.enable) {
      return store
    }
    // 校验 浏览器是否支持 storage
    if (this.testStorage(store)) {
      this.enable = true
      return store
    }
    // 浏览器不支持 storage
    this.enable = false
    throw new Error('您的浏览器不支持 localStorage!')
  }

  /**
   * 设置存储的键值对
   * @param { String } key 存储键
   * @param { String } data 存储数据
   */
  set(key, data) {
    this.storage().setItem(this.namespace + key, JSON.stringify(data))
  }

  /**
   * 获取指定存储内容
   * @param { String } key 存储键
   * @param { Function } error 数据没有找到后执行回调函数
   */
  get(key, { check = true, error = () => {} } = {}) {
    try {
      const data = this.storage().getItem(this.namespace + key)
      if (check && data === null) {
        error()
        return ''
      }
      return JSON.parse(data)
    } catch (e) {
      error(e)
      return ''
    }
  }

  /**
   * 删除指定存储内容
   * @param { String } key 存储键
   * @param { Function } success 数据删除成功后执行回调函数
   */
  remove(key) {
    this.storage().removeItem(this.namespace + key)
  }

  /**
   * 设置多个存储内容
   * @param { Object } storageList 存储列表
   * @description storageList 数据结构 : [{key:'xxx',val:"xxxx"}]
   */
  setList(storageList) {
    for (let i = 0; i < storageList.length; i++) {
      this.set(storageList[i].key, storageList[i].val)
    }
  }

  /**
   * 获取多个指定存储内容
   * @param { Array } keyList 存储键列表
   * @param { Function } success 数据查找成功后执行回调函数
   * @param { Boolean } check 检查列表中是否有 没返回内容的key
   * @param { Function } error 数据没有找到后执行回调函数
   * @description success 回调参数格式: [{ key:'xxx' ,val:'xxxx'}]
   */
  getList(keyList, { check = true, error = () => {} } = {}) {
    const list = []
    for (let i = 0; i < keyList.length; i++) {
      const item = this.get(keyList[i])
      if (item !== '') {
        list.push({
          key: keyList[i],
          val: item
        })
      } else if (check) {
        // throw new Error(`当前 key : ${keyList[i]}不存在`);
        error([])
        return []
      }
    }
    return list
  }

  /**
   * 删除多个指定存储内容
   * @param { Array } keyList 存储键列表
   */
  removeList(keyList) {
    if (Array.isArray(keyList)) {
      keyList.forEach((item) => this.remove(item))
    } else {
      console.warn(`[ Storage ]: 传入的 KeyList 必须是一个数组`)
    }
  }

  /**
   * 清空所有存储内容
   * @param { Function } success 数据查找成功后执行回调函数
   */
  clear() {
    this.storage().clear()
  }
}

// 持久化对象，减少对象的创建，避免浪费空间
const storage = new Storage()

export { storage, Storage }
