/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:09:22
 */
import { useEffect, useState } from 'react'
import { getWorkerLogs } from '@utils/proxy/worker-log'
import { useEchProxy } from './useEchProxy'
import { usePingTests } from './usePingTests'
import { useProxyMode } from './useProxyMode'
import { useWorkerFields } from './useWorkerFields'

import type { WorkerLog } from '@utils/proxy/worker-log'
export type { ProxyMode } from './useProxyMode'

/** Worker 代理设置逻辑 */
export function useWorkerSettings() {
  const echProxy = useEchProxy()
  const workerFields = useWorkerFields()
  const pingTests = usePingTests()
  const proxyMode = useProxyMode()
  const [workerLogs, setWorkerLogs] = useState<WorkerLog[]>([])

  // 定期获取 Worker 日志
  useEffect(() => {
    const fetchWorkerLogs = () => {
      setWorkerLogs(getWorkerLogs())
    }

    fetchWorkerLogs()
    const timer = setInterval(fetchWorkerLogs, 5000)
    return () => clearInterval(timer)
  }, [])

  return {
    ...echProxy,
    ...workerFields,
    ...pingTests,
    ...proxyMode,

    /** Worker 日志 */
    workerLogs,

    /** ECH 是否开启 */
    echRunning: echProxy.echRunning,

    /** ECH 操作中 */
    echLoading: echProxy.echLoading,

    /** ECH 端口 */
    echPort: proxyMode.echPort || echProxy.echPort,

    /** 保存字段到设置 */
    saveFields: workerFields.saveFields
  }
}
