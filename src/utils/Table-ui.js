export const cloudTypeMap = {
  Wocloud: '#fec105',
  WOCLOUD: '#fec105',
  Wo: '#fec105',
  Office: '#35b083',
  OFFICE: '#35b083',
  Azure: '#27abfe',
  AZURE: '#27abfe',
  Tencent: '#02c8d6',
  TENCENT: '#02c8d6',
  Baidu: '#2252f7',
  BAIDU: '#2252f7',
  Ali: '#ff6b01',
  Aliyun: '#ff6b01',
  ALIYUN: '#ff6b01',
  MEC: '#35b084',
  Mec: '#35b084',
  Aws: '#203f5d',
  AWS: '#203f5d',
  Huawei: '#b978fe',
  HUAWEI: '#b978fe',
  Jinshan: '#008000',
  JINSHAN: '#008000',
  JdCloud: '#db1517',
  JDCLOUD: '#db1517',
  VOLCENGINE: '#ff5722',
  QING: '#a0d911',
  Qing: '#a0d911'
}
export const COLOR = {
  SUCCESS: '#67C23A',
  WARNING: '#E6A23C',
  ERROR: '#F56C6C',
  PRIMARY: '#409EFF',
  GRAY: '#909399',
  WHITE: '#FFFFFF',
  BLACK: '#000000'
}
export const runningMap = {
  CancelCreate: COLOR.SUCCESS, // 取消创建
  None: COLOR.GRAY, // 无
  NEED_CREATE: COLOR.PRIMARY, // 待创建
  CREATING: COLOR.PRIMARY, // 创建中
  Creat_Error: COLOR.ERROR, // 创建失败
  Create_Fail: COLOR.ERROR, // 创建失败
  Delete_Fail: COLOR.ERROR, // 删除失败
  NEED_DELETE: COLOR.ERROR, // 删除失败
  DELETING: COLOR.ERROR, // 删除中
  Pending: COLOR.PRIMARY, // 等待中
  Suspended: COLOR.PRIMARY, // 已挂起
  UPDATING: COLOR.PRIMARY, // 更新中
  STARTING: COLOR.PRIMARY, // 启动中
  ATTACH: COLOR.PRIMARY, // 挂载中
  RUNNING: COLOR.SUCCESS, // 正在运行
  STOPPING: COLOR.PRIMARY, // 停止中
  NEED_STOP: COLOR.WARNING, // 停止中
  NEED_RESTART: COLOR.WARNING, // 待重启
  STOPPED: COLOR.ERROR, // 已停止
  RESTARTING: COLOR.PRIMARY, // 重启中
  Deallocating: COLOR.PRIMARY, // 取消分配中
  Deallocated: COLOR.SUCCESS, // 已取消分配
  DELETED: COLOR.SUCCESS, // 删除成功
  SUCCESS: COLOR.SUCCESS, // 运行成功
  DECONSTRUCT: COLOR.WARNING, // 需求解构
  ARRANGE: COLOR.WARNING, // 资源编排
  DISPATCH: COLOR.WARNING, // 资源部署
  EXECUTION: COLOR.WARNING, // 应用执行

  Delete: COLOR.SUCCESS, // 删除成功
  DeleteFail: COLOR.ERROR, // 删除失败
  Terminating: COLOR.PRIMARY, // 终止中
  Rebuilding: COLOR.PRIMARY, // 重新构建中
  ChangingPwd: COLOR.PRIMARY, // 修改密码的过程中
  Resizing: COLOR.PRIMARY, // "扩容的过程中
  Locking: COLOR.PRIMARY, // 锁定的过程中
  Unlocking: COLOR.PRIMARY, // 在解锁的过程中
  TERMINATED: COLOR.PRIMARY, // 已终止
  IN_USE: COLOR.SUCCESS, // 使用中
  AVAILABLE: COLOR.PRIMARY, // 可用
  FAILED: COLOR.ERROR, // 全部失败
  ALLSUCCESS: COLOR.SUCCESS, // 全部成功
  PARTSUCCESS: COLOR.PRIMARY, // 部分成功
  CREATE: COLOR.PRIMARY, // 创建
  EXTEND: COLOR.WARNING, // 扩容
  DETACH: COLOR.ERROR, // 卸载
  UPDATE: COLOR.SUCCESS, // 更新
  RESUME: COLOR.SUCCESS, // 恢复
  CANCEL: COLOR.WARNING, // 撤销
  TERMINATE: COLOR.ERROR, // 终止
  DELETE: COLOR.ERROR, // 删除
  START: COLOR.SUCCESS, // 开始
  STOP: COLOR.GRAY, // 停止
  Normal: COLOR.PRIMARY, // 正常
  CreatFail: COLOR.ERROR, // 创建失败
  Enable: COLOR.SUCCESS, // 启用
  ONLINE: COLOR.SUCCESS,
  OFFLINE: COLOR.ERROR,
  Disable: COLOR.ERROR, // 禁用
  DISCARD: COLOR.ERROR, // 禁用
  INIT: COLOR.PRIMARY, // 初始化
  WAIT: COLOR.WARNING, // 待执行
  PENDING: COLOR.PRIMARY, // 执行中
  RESTART: COLOR.WARNING, // 重启
  NONE: COLOR.GRAY, // 重启
  BIND: COLOR.SUCCESS, // 绑定
  UNBIND: COLOR.ERROR, // 解绑
  BINDING: COLOR.WARNING, // 绑定中
  UNBINDING: COLOR.WARNING, // 解绑中
  NEED_BIND: COLOR.PRIMARY, // 待绑定
  NEED_UNBIND: COLOR.PRIMARY, // 带解绑
  UPLOAD: COLOR.PRIMARY, // 上传
  CLOUD_DELETED: COLOR.ERROR, // 云商已删除
  UNDEPLOYED: COLOR.WARNING, // 未部署
  DEPLOYED: COLOR.SUCCESS, // 已部署
  DEPLOYEING: COLOR.PRIMARY, // 部署中
  UPDATE_NAME: COLOR.SUCCESS, // 更新名称
  UPDATE_NOTES: COLOR.SUCCESS, // 更新备注
  UPDATE_PASSWORD: COLOR.SUCCESS, // 修改密码
  UPDATE_NSG: COLOR.SUCCESS, // 更新安全组
  // 0523 lxl
  PART_SUCCESS: COLOR.SUCCESS, // 部分完成
  MISSION_SERVICE_ORDER: COLOR.SUCCESS // 部分完成
}
// 新操作状态色值
export const operateMap = {
  NONE: COLOR.PRIMARY, // 无操作
  FAILED: COLOR.ERROR, // 操作失败
  NEED_CREATE: COLOR.PRIMARY, // 待创建
  CREATING: COLOR.WARNING, // 创建中
  NEED_DELETE: COLOR.PRIMARY, // 待删除
  DELETING: COLOR.WARNING, // 删除中
  NEED_UPDATE: COLOR.PRIMARY, // 待更新
  UPDATING: COLOR.WARNING, // 更新中
  NEED_START: COLOR.PRIMARY, // 待启动
  STARTING: COLOR.WARNING, // 启动中
  NEED_STOP: COLOR.PRIMARY, // 待停止
  STOPPING: COLOR.WARNING, // 停止中
  NEED_RESTART: COLOR.PRIMARY, // 待重启
  RESTARTING: COLOR.WARNING, // 重启中
  NEED_TERMINATE: COLOR.PRIMARY, // 待终止
  TERMINATING: COLOR.WARNING, // 终止中
  NEED_ATTACH: COLOR.PRIMARY, // 待挂载
  NEED_DETACH: COLOR.PRIMARY, // 待卸载
  ATTACHING: COLOR.WARNING, // 挂载中
  DETACHING: COLOR.WARNING, // 卸载中
  NEED_PAUSE: COLOR.PRIMARY, // 待暂停执行
  PAUSING: COLOR.WARNING, // 暂停执行中
  NEED_RESUME: COLOR.PRIMARY, // 待恢复执行
  RESUMING: COLOR.WARNING, // 恢复执行中
  NEED_CANCEL: COLOR.PRIMARY, // 待撤销
  CANCELING: COLOR.WARNING, // 撤销中
  NEED_EXTEND: COLOR.PRIMARY, // 待扩容
  EXTENDING: COLOR.WARNING, // 扩容中
  BIND: COLOR.SUCCESS, // 绑定
  UNBIND: COLOR.ERROR, // 解绑
  BINDING: COLOR.WARNING, // 绑定中
  UNBINDING: COLOR.WARNING, // 解绑中
  NEED_BIND: COLOR.PRIMARY, // 待绑定
  NEED_UNBIND: COLOR.PRIMARY, // 待解绑
  // 0523 lxl
  NEED_EXCUTE: COLOR.WARNING, // 待执行
  EXCUTING: COLOR.WARNING, // 执行中
  NEED_DECONSTRUCT: COLOR.PRIMARY, // 待解构
  DECONSTRUCTING: COLOR.WARNING, // 解构中
  NEED_ARRANGE: COLOR.PRIMARY, // 待编排
  ARRANGING: COLOR.WARNING, // 编排中
  NEED_DISPATCH: COLOR.PRIMARY, // 待部署
  DISPATCHING: COLOR.WARNING, // 部署中
  NEED_EXECUTION: COLOR.PRIMARY, // 应用待执行
  EXECUTIONING: COLOR.WARNING, // 应用执行中
  RESOURCES_RELEASING: COLOR.WARNING // 资源释放中
}

// 访问权限
const alcMap = {
  'public-read-write': COLOR.SUCCESS, // 公共读写
  'public-read': COLOR.PRIMARY, // 公共读
  private: COLOR.WARNING // 私有（默认值）
}
class TableUi {
  constructor(tableHead) {
    this.tableHead = tableHead
  }
  setTag(prop, colorTagKey, colorMap = {}) {
    const column = this.tableHead.find((item) => item.prop === prop)
    if (!column) return this
    column.colorTagKey = colorTagKey
    switch (colorTagKey) {
      case 'cloudType':
        column.colorMap = Object.assign({}, cloudTypeMap, colorMap)
        break
      case 'runStatus':
      case 'runStatusString':
      case 'taskType':
      case 'status':
      case 'statusEnum':
        column.colorMap = Object.assign({}, runningMap, colorMap)
        break
      case 'taskType':
      case 'operateStatus':
        column.colorMap = Object.assign({}, operateMap, colorMap)
        break
      case 'acl':
        column.colorMap = Object.assign({}, alcMap, colorMap)
        break
      default:
        column.colorMap = colorMap
        break
    }
    return this
  }
  setWidth(prop, width) {
    const column = this.tableHead.find((item) => item.prop === prop)
    if (!column) return this
    column.width = width
    return this
  }
  toValue() {
    return this.tableHead
  }
}

export default TableUi
