// k8s
import { formatAjaxFn } from '@/api/unit'
const baseUrl = '/api/resource/kubernetes/'

export const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  }
]

// kinds NODES,NAMESPACES,PERSISTENT_VOLUMES,DEPLOYMENT,STATEFUL_SETS,DAEMON_SETS,CRON_JOBS,JOBS,PODS,SERVICES,CONFIG_MAPS,SECRETS,PERSISTENT_VOLUME_CLAIMS,CUSTOM_RESOURCE_DEFINITION

export const api = {
  // 通用
  deleteResourcePOST: baseUrl + 'delete', //删除
  createOrUpdatePOST: baseUrl + 'createOrUpdate', // 新增/编辑
  changeReplicasPOST: baseUrl + 'update/replicas', // 变更副本
  getYamlPOST: baseUrl + 'yaml',
  // node
  getNodesPOST: baseUrl + 'nodes/query',
  getPersistentVolumesPOST: baseUrl + 'persistentVolumes/query',
  getNamespacesPOST: baseUrl + 'namespaces/query',
  getPodsPOST: baseUrl + 'pods/query',
  getPodsLogPOST: baseUrl + 'pod/log',
  getPodsLogDlPOST: baseUrl + 'pod/log/download',
  getConfigMapsPOST: baseUrl + 'configMaps/query',
  getSecretsPOST: baseUrl + 'secrets/query',
  getServicesPOST: baseUrl + 'services/query',
  getPvcPOST: baseUrl + 'persistentVolumeClaims/query',
  // deployments
  getDeploymentsPOST: `${baseUrl}deployments/query`,
  getStatefulSetsPOST: baseUrl + 'statefulSets/query',
  getDaemonSetsPOST: baseUrl + 'daemonSets/query',
  getCronJobsPOST: baseUrl + 'cronJobs/query',
  getJobsPOST: baseUrl + 'jobs/query',
  // pv
  getPvDiskListPOST: baseUrl + 'pv/diskList',
  pvCreatePOST: baseUrl + 'pv/create',
  pvUpdatePOST: baseUrl + 'pv/update',
  pvDetailPOST: baseUrl + 'pv/detail',
  pvDeletePOST: baseUrl + 'pv/delete',

  // service

  serviceCreatePOST: baseUrl + 'service/create',
  serviceUpdatePOST: baseUrl + 'service/update',
  getServiceClbPOST: baseUrl + 'service/clbList',
  getServiceDetailPOST: baseUrl + 'service/detail',
  serviceDeletePOST: baseUrl + 'service/delete'
}

const request = formatAjaxFn(api)

export default request

const apiMap = {
  NODES: 'getNodesPOST',
  NAMESPACES: 'getNamespacesPOST',
  PERSISTENT_VOLUMES: 'getPersistentVolumesPOST',
  DEPLOYMENT: 'getDeploymentsPOST',
  STATEFUL_SETS: 'getStatefulSetsPOST',
  DAEMON_SETS: 'getDaemonSetsPOST',
  CRON_JOBS: 'getCronJobsPOST',
  JOBS: 'getJobsPOST',
  PODS: 'getPodsPOST',
  SERVICES: 'getServicesPOST',
  CONFIG_MAPS: 'getConfigMapsPOST',
  SECRETS: 'getSecretsPOST',
  PERSISTENT_VOLUME_CLAIMS: 'getPvcPOST'
}

export const search = (kind) => request[apiMap[kind]]
