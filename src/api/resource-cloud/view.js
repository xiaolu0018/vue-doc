import commonUtil from '@/api/axios'
const baseUrl = '/api/business/'
function useDiskActions() {
  return {
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'disk/ui'),
    search: (businessId, param) =>
      commonUtil.generatePromisePost(baseUrl + `disk/${businessId}`, param),
    delete: (businessId, cloudType, ids) =>
      commonUtil.generatePromisePost(baseUrl + `delete/disk/${businessId}/${cloudType}/${ids}`),
    modifyDisk: (param) => commonUtil.generatePromisePost(baseUrl + `modify/disk`, param),
    getAvaliableVm: (param) => commonUtil.generatePromisePost(baseUrl + 'vm/avaliable', param)
  }
}
function useIpActions() {
  return {
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'pip/ui'),
    search: (businessId, param) =>
      commonUtil.generatePromisePost(baseUrl + `pip/${businessId}`, param),
    delete: (businessId, cloudType, ids) =>
      commonUtil.generatePromisePost(baseUrl + `delete/pip/${businessId}/${cloudType}/${ids}`),
    modifyPip: (param) => commonUtil.generatePromisePost(baseUrl + `modify/eip`, param),
    create: (param) => commonUtil.generatePromisePost(baseUrl + `create/pip`, param),
    getAvaliableVm: (param) => commonUtil.generatePromisePost(baseUrl + 'vm/bindable', param)
  }
}
function useVmActions() {
  return {
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'vm/ui'),
    search: (businessId, param) =>
      commonUtil.generatePromisePost(baseUrl + `vm/${businessId}`, param),
    delete: (businessId, cloudType, instanceId) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'DEL_VM',
        businessId,
        cloudType,
        instanceId
      }),
    start: ({ cloudType, instanceId, initLocalDisk = false }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'START_INSTANCE',
        cloudType,
        instanceId,
        initLocalDisk
      }),
    stop: ({ cloudType, instanceId, forceStop = false }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'STOP_INSTANCE',
        cloudType,
        instanceId,
        forceStop
      }),
    reboot: ({ cloudType, instanceId, forceStop = false }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'REBOOT_INSTANCE',
        cloudType,
        instanceId,
        forceStop
      }),
    joinNsg: ({ cloudType, instanceId, nsgId }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'MOUNT_SECURITY_GROUP',
        cloudType,
        instanceId,
        nsgId
      }),
    leaveNsg: ({ cloudType, instanceId, nsgId }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'UNMOUNT_SECURITY_GROUP',
        cloudType,
        instanceId,
        nsgId
      }),
    joinNic: ({ cloudType, instanceId, nicId }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'MOUNT_NIC',
        cloudType,
        instanceId,
        nicId
      }),
    leaveNic: ({ cloudType, instanceId, nicId }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'UNMOUNT_NIC',
        cloudType,
        instanceId,
        nicId
      }),
    getVmNsgs: ({ cloudType, cpVmId, cloudAccountId }) =>
      commonUtil.generatePromisePost(baseUrl + 'nsg', { cloudType, cpVmId, cloudAccountId }),
    getAvaliableNsgs: ({ cloudType, instanceId }) =>
      commonUtil.generatePromisePost(baseUrl + 'nsg/avaliable', { cloudType, instanceId }),
    create: ({ cloudType, businessId, ecsEntries }) =>
      commonUtil.generatePromisePost(baseUrl + 'modify/vm', {
        action: 'CREATE_INSTANCE',
        cloudType,
        businessId,
        ecsEntries
      })
  }
}

function useNetworkActions() {
  const baseUrl = '/api/network/'
  return {
    getRegions: () => commonUtil.generatePromiseGet(baseUrl + 'cloud/region/provicecity'),
    getBandwidth: () => commonUtil.generatePromiseGet(baseUrl + 'bandwidth/list'),
    getLinktype: () => commonUtil.generatePromiseGet(baseUrl + 'linktype/list'),
    getVpcs: (param) => commonUtil.generatePromisePost(baseUrl + 'vpc/list', param),
    getProvinces: () => commonUtil.generatePromiseGet(baseUrl + 'province/list')
  }
}

function useBusinessActions() {
  return {
    getSearchTypes: () => commonUtil.generatePromiseGet(baseUrl + 'search/businessSearchType'),
    getStatuses: () => commonUtil.generatePromiseGet(baseUrl + 'search/businessStatus'),
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'search/ui'),
    create: (param) => commonUtil.generatePromisePost(baseUrl + 'create', param),
    createByPkg: (param) => commonUtil.generatePromisePost('/api/combo/create', param),
    search: (param) => commonUtil.generatePromisePost(baseUrl + 'search', param),
    detailUI: () => commonUtil.generatePromiseGet(baseUrl + 'basic/ui'),
    detail: (businessId) => commonUtil.generatePromiseGet(baseUrl + `detail/${businessId}`),
    delete: (ids) => commonUtil.generatePromisePost(baseUrl + `delete/${ids}`),
    getLaunchProvince: () => commonUtil.generatePromiseGet(baseUrl + 'initiate/province/list')
  }
}

function useOrderActions() {
  return {
    getSearchTypes: () => commonUtil.generatePromiseGet(baseUrl + 'search/orderSearchType'),
    getStatuses: () => commonUtil.generatePromiseGet(baseUrl + 'search/orderStatus'),
    getOrderTypes: () => commonUtil.generatePromiseGet(baseUrl + 'search/orderType'),
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'order/search/ui'),
    searchByBus: (businessId, param) =>
      commonUtil.generatePromisePost(baseUrl + `order/${businessId}`, param),
    search: (param) => commonUtil.generatePromisePost(baseUrl + 'order/search', param),
    detail: (id) => commonUtil.generatePromisePost(baseUrl + `order/detail/${id}`),
    getVmColumns: () => commonUtil.generatePromiseGet(baseUrl + 'order/vm/ui'),
    getDiskColumns: () => commonUtil.generatePromiseGet(baseUrl + 'order/disk/ui'),
    getPipColumns: () => commonUtil.generatePromiseGet(baseUrl + 'order/pip/ui')
  }
}

function useAccessPointActions() {
  return {
    getColumns: () => commonUtil.generatePromiseGet(baseUrl + 'accessPoints/ui'),
    search: (businessId, param) =>
      commonUtil.generatePromisePost(baseUrl + `accessPoints/${businessId}`, param),
    modify: (param) => commonUtil.generatePromisePost(baseUrl + `modify/network`, param)
  }
}

function useOverviewActions() {
  const baseUrl = '/api/business/monitor/'
  return {
    getResData: () => commonUtil.generatePromiseGet(baseUrl + 'overview'),
    getBusData: (businessId) => commonUtil.generatePromiseGet(baseUrl + `overview/${businessId}`),
    getDynamicData: () => commonUtil.generatePromiseGet(baseUrl + 'dynamic/overview'),
    getDynamicDataByBusinessId: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `dynamic/overview/${businessId}`),
    getCascade: () => commonUtil.generatePromiseGet(baseUrl + 'cascade'),
    getMonitorUrls: (cloudType, vmCpId) =>
      commonUtil.generatePromiseGet(baseUrl + `vm/overview/${vmCpId}/${cloudType}`),
    getBusinesses: () => commonUtil.generatePromiseGet(baseUrl + 'business/list'),
    getDurationList: () =>
      commonUtil.generatePromiseGet(baseUrl + 'business/monitor/duration/list'),

    getVmsData: (businessId, duration, cloudType, resourceType) =>
      commonUtil.generatePromiseGet(baseUrl + `business/vm/list/${businessId}/${duration}`),
    getNetWordData: (businessId, duration) =>
      commonUtil.generatePromiseGet(baseUrl + `business/network/list/${businessId}/${duration}`),

    searchNetword: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `business/network/quota/${businessId}`),
    searchVm: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `business/vm/quota/${businessId}`),

    getMapInfo: (businessId) => commonUtil.generatePromiseGet(baseUrl + `map/${businessId}`),
    getMapNodeInfo: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `mapNode/${businessId}`),
    getCloudTypes: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `getCloudType/${businessId}`),
    getResourceTypes: () => commonUtil.generatePromiseGet(baseUrl + 'getResourceType'),
    getAccessTypes: (businessId) =>
      commonUtil.generatePromiseGet(baseUrl + `getNetworkAccessType/${businessId}`),
    getCloudResourceMonitor: (businessId, duration, cloudType, resourceType) =>
      commonUtil.generatePromisePost(baseUrl + 'business/cloudResource/quota', {
        businessId,
        duration,
        cloudType,
        resourceType
      }),
    getNetworkMonitor: (businessId, duration, accessTypeItemEnumType) =>
      commonUtil.generatePromisePost(baseUrl + 'business/network/list', {
        businessId,
        duration,
        accessTypeItemEnumType
      })
  }
}

function usePackageRequiredActions() {
  const baseUrl = '/api/combo/'
  return {
    fetchPackages: () => commonUtil.generatePromiseGet(baseUrl + 'packages'),
    fetchAccounts: (param) => commonUtil.generatePromisePost(baseUrl + 'accounts', param),
    fetchRegions: (param) => commonUtil.generatePromisePost(baseUrl + 'regions', param),
    fetchNetworks: (param) => commonUtil.generatePromisePost(baseUrl + 'vpcs', param),
    fetchSecurityGroups: (param) => commonUtil.generatePromisePost(baseUrl + 'vpcs', param),
    fetchImages: (param) => commonUtil.generatePromisePost(baseUrl + 'images', param)
  }
}

export {
  useDiskActions,
  useIpActions,
  useVmActions,
  useNetworkActions,
  useBusinessActions,
  useOrderActions,
  useAccessPointActions,
  useOverviewActions,
  usePackageRequiredActions
}
