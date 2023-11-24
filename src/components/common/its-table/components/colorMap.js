import colors from '@/styles/colors.scss'
/**
 * 表格组件标签颜色字典
 * Case Sensitive 键名必须大写
 *
 */
export const colorMap = {
  // 云商
  WOCLOUD: colors.UI_COLOR_WOCLOUD,
  ALIYUN: colors.UI_COLOR_ALIYUN,
  MEC: colors.UI_COLOR_MEC,
  JINSHAN: colors.UI_COLOR_JINSHAN,
  HUAWEI: colors.UI_COLOR_HUAWEI,
  VOLCENGINE: colors.UI_COLOR_VOLCENGINE,
  CENTER: colors.UI_COLOR_CENTER,
  EDGE: colors.UI_COLOR_EDGE,
  BAIDU: colors.UI_COLOR_BAIDU,
  JDCLOUD: colors.UI_COLOR_JDCLOUD,
  TENCENT: colors.UI_COLOR_TENCENT,
  AZURE: colors.UI_COLOR_AZURE,
  QING: colors.UI_COLOR_QING,
  AWS: colors.UI_COLOR_AWS,
  // 第三方
  WO: colors.UI_COLOR_WOCLOUD,
  ALI: colors.UI_COLOR_ALIYUN,
  MICROSOFT: colors.UI_COLOR_AZURE,
  JINGDONG: colors.UI_COLOR_JDCLOUD,
  MUCEP: colors.UI_COLOR_MUCEP,

  // 运行状态
  CANCELCREATE: colors.UI_COLOR_SUCCESS, // 取消创建
  NEED_CREATE: colors.UI_COLOR_PRIMARY, // 待创建
  CREATING: colors.UI_COLOR_PRIMARY, // 创建中
  CREAT_ERROR: colors.UI_COLOR_ERROR, // 创建失败
  CREATE_FAIL: colors.UI_COLOR_ERROR, // 创建失败
  DELETE_FAIL: colors.UI_COLOR_ERROR, // 删除失败
  NEED_DELETE: colors.UI_COLOR_ERROR, // 删除失败
  DELETING: colors.UI_COLOR_ERROR, // 删除中
  PENDING: colors.UI_COLOR_PRIMARY, // 等待中
  SUSPENDED: colors.UI_COLOR_PRIMARY, // 已挂起
  UPDATING: colors.UI_COLOR_PRIMARY, // 更新中
  STARTING: colors.UI_COLOR_PRIMARY, // 启动中
  ATTACH: colors.UI_COLOR_WARNING, // 挂载中
  RUNNING: colors.UI_COLOR_SUCCESS, // 正在运行
  STOPPING: colors.UI_COLOR_PRIMARY, // 停止中
  NEED_STOP: colors.UI_COLOR_WARNING, // 停止中
  NEED_RESTART: colors.UI_COLOR_WARNING, // 待重启
  STOPPED: colors.UI_COLOR_ERROR, // 已停止
  RESTARTING: colors.UI_COLOR_PRIMARY, // 重启中
  DEALLOCATING: colors.UI_COLOR_PRIMARY, // 取消分配中
  DEALLOCATED: colors.UI_COLOR_SUCCESS, // 已取消分配
  DELETED: colors.UI_COLOR_SUCCESS, // 删除成功
  SUCCESS: colors.UI_COLOR_SUCCESS, // 运行成功
  DECONSTRUCT: colors.UI_COLOR_WARNING, // 需求解构
  ARRANGE: colors.UI_COLOR_WARNING, // 资源编排
  DISPATCH: colors.UI_COLOR_WARNING, // 资源部署
  EXECUTION: colors.UI_COLOR_WARNING, // 应用执行

  DELETEFAIL: colors.UI_COLOR_ERROR, // 删除失败
  TERMINATING: colors.UI_COLOR_PRIMARY, // 终止中
  REBUILDING: colors.UI_COLOR_PRIMARY, // 重新构建中
  CHANGINGPWD: colors.UI_COLOR_PRIMARY, // 修改密码的过程中
  RESIZING: colors.UI_COLOR_PRIMARY, // "扩容的过程中
  LOCKING: colors.UI_COLOR_PRIMARY, // 锁定的过程中
  UNLOCKING: colors.UI_COLOR_PRIMARY, // 在解锁的过程中
  TERMINATED: colors.UI_COLOR_PRIMARY, // 已终止
  IN_USE: colors.UI_COLOR_SUCCESS, // 使用中
  AVAILABLE: colors.UI_COLOR_PRIMARY, // 可用
  FAILED: colors.UI_COLOR_ERROR, // 全部失败
  ALLSUCCESS: colors.UI_COLOR_SUCCESS, // 全部成功
  PARTSUCCESS: colors.UI_COLOR_PRIMARY, // 部分成功
  CREATE: colors.UI_COLOR_PRIMARY, // 创建
  EXTEND: colors.UI_COLOR_WARNING, // 扩容
  DETACH: colors.UI_COLOR_ERROR, // 卸载
  UPDATE: colors.UI_COLOR_SUCCESS, // 更新
  RESUME: colors.UI_COLOR_SUCCESS, // 恢复
  CANCEL: colors.UI_COLOR_WARNING, // 撤销
  TERMINATE: colors.UI_COLOR_ERROR, // 终止
  DELETE: colors.UI_COLOR_ERROR, // 删除
  START: colors.UI_COLOR_SUCCESS, // 开始
  STOP: colors.UI_COLOR_GRAY, // 停止
  NORMAL: colors.UI_COLOR_PRIMARY, // 正常
  CREATFAIL: colors.UI_COLOR_ERROR, // 创建失败
  ENABLE: colors.UI_COLOR_SUCCESS, // 启用
  ONLINE: colors.UI_COLOR_SUCCESS,
  OFFLINE: colors.UI_COLOR_ERROR,
  DISABLE: colors.UI_COLOR_ERROR, // 禁用
  DISCARD: colors.UI_COLOR_ERROR, // 禁用
  INIT: colors.UI_COLOR_PRIMARY, // 初始化
  WAIT: colors.UI_COLOR_WARNING, // 待执行
  PENDING: colors.UI_COLOR_PRIMARY, // 执行中
  RESTART: colors.UI_COLOR_WARNING, // 重启
  NONE: colors.UI_COLOR_GRAY, // 重启
  BIND: colors.UI_COLOR_SUCCESS, // 绑定
  UNBIND: colors.UI_COLOR_ERROR, // 解绑
  BINDING: colors.UI_COLOR_WARNING, // 绑定中
  UNBINDING: colors.UI_COLOR_WARNING, // 解绑中
  NEED_BIND: colors.UI_COLOR_PRIMARY, // 待绑定
  NEED_UNBIND: colors.UI_COLOR_PRIMARY, // 带解绑
  UPLOAD: colors.UI_COLOR_PRIMARY, // 上传
  CLOUD_DELETED: colors.UI_COLOR_ERROR, // 云商已删除
  UNDEPLOYED: colors.UI_COLOR_WARNING, // 未部署
  DEPLOYED: colors.UI_COLOR_SUCCESS, // 已部署
  DEPLOYEING: colors.UI_COLOR_PRIMARY, // 部署中
  UPDATE_NAME: colors.UI_COLOR_SUCCESS, // 更新名称
  UPDATE_NOTES: colors.UI_COLOR_SUCCESS, // 更新备注
  UPDATE_PASSWORD: colors.UI_COLOR_SUCCESS, // 修改密码
  UPDATE_NSG: colors.UI_COLOR_SUCCESS, // 更新安全组
  PART_SUCCESS: colors.UI_COLOR_SUCCESS, // 部分完成
  MISSION_SERVICE_ORDER: colors.UI_COLOR_SUCCESS, // 部分完成

  // 操作状态
  FAILED: colors.UI_COLOR_ERROR, // 操作失败
  NEED_CREATE: colors.UI_COLOR_PRIMARY, // 待创建
  CREATING: colors.UI_COLOR_WARNING, // 创建中
  NEED_DELETE: colors.UI_COLOR_PRIMARY, // 待删除
  DELETING: colors.UI_COLOR_WARNING, // 删除中
  NEED_UPDATE: colors.UI_COLOR_PRIMARY, // 待更新
  UPDATING: colors.UI_COLOR_WARNING, // 更新中
  NEED_START: colors.UI_COLOR_PRIMARY, // 待启动
  STARTING: colors.UI_COLOR_WARNING, // 启动中
  NEED_STOP: colors.UI_COLOR_PRIMARY, // 待停止
  STOPPING: colors.UI_COLOR_WARNING, // 停止中
  NEED_RESTART: colors.UI_COLOR_PRIMARY, // 待重启
  RESTARTING: colors.UI_COLOR_WARNING, // 重启中
  NEED_TERMINATE: colors.UI_COLOR_PRIMARY, // 待终止
  TERMINATING: colors.UI_COLOR_WARNING, // 终止中
  NEED_ATTACH: colors.UI_COLOR_PRIMARY, // 待挂载
  NEED_DETACH: colors.UI_COLOR_PRIMARY, // 待卸载
  ATTACHING: colors.UI_COLOR_WARNING, // 挂载中
  DETACHING: colors.UI_COLOR_WARNING, // 卸载中
  NEED_PAUSE: colors.UI_COLOR_PRIMARY, // 待暂停执行
  PAUSING: colors.UI_COLOR_WARNING, // 暂停执行中
  NEED_RESUME: colors.UI_COLOR_PRIMARY, // 待恢复执行
  RESUMING: colors.UI_COLOR_WARNING, // 恢复执行中
  NEED_CANCEL: colors.UI_COLOR_PRIMARY, // 待撤销
  CANCELING: colors.UI_COLOR_WARNING, // 撤销中
  NEED_EXTEND: colors.UI_COLOR_PRIMARY, // 待扩容
  EXTENDING: colors.UI_COLOR_WARNING, // 扩容中
  BIND: colors.UI_COLOR_SUCCESS, // 绑定
  UNBIND: colors.UI_COLOR_ERROR, // 解绑
  BINDING: colors.UI_COLOR_WARNING, // 绑定中
  UNBINDING: colors.UI_COLOR_WARNING, // 解绑中
  NEED_BIND: colors.UI_COLOR_PRIMARY, // 待绑定
  NEED_UNBIND: colors.UI_COLOR_PRIMARY, // 待解绑
  NEED_EXCUTE: colors.UI_COLOR_WARNING, // 待执行
  EXCUTING: colors.UI_COLOR_WARNING, // 执行中
  NEED_DECONSTRUCT: colors.UI_COLOR_PRIMARY, // 待解构
  DECONSTRUCTING: colors.UI_COLOR_WARNING, // 解构中
  NEED_ARRANGE: colors.UI_COLOR_PRIMARY, // 待编排
  ARRANGING: colors.UI_COLOR_WARNING, // 编排中
  NEED_DISPATCH: colors.UI_COLOR_PRIMARY, // 待部署
  DISPATCHING: colors.UI_COLOR_WARNING, // 部署中
  NEED_EXECUTION: colors.UI_COLOR_PRIMARY, // 应用待执行
  EXECUTIONING: colors.UI_COLOR_WARNING, // 应用执行中
  RESOURCES_RELEASING: colors.UI_COLOR_WARNING, // 资源释放中

  // taskType
  UPDATE_STATUS: colors.UI_COLOR_SUCCESS,
  ABORTING: colors.UI_COLOR_WARNING,
  EXCUTE: colors.UI_COLOR_SUCCESS,

  // 解构记录
  CLOSE: colors.UI_COLOR_GRAY,
  // WAF
  OPENED: colors.UI_COLOR_SUCCESS,
  MIGRATE_SUCCESS: colors.UI_COLOR_SUCCESS,
  READY: colors.UI_COLOR_PRIMARY,
  // support
  1: colors.UI_COLOR_PRIMARY,
  0: colors.UI_COLOR_GRAY
}
