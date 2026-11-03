/*
 * @Author: czy0729
 * @Date: 2026-11-04 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 站点逐个串行检测的状态机
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { subjectStore } from '@stores'
import { err, ping, t } from '@utils/fetch'
import { PING_COUNTS, PING_TIMEOUT } from './ds'
import { getSitesList } from './utils'

import type { ProbeMode, Site } from './types'

export function useServerStatusPage() {
  const [list, setList] = useState<Site[]>(() => getSitesList(subjectStore.origin))
  const [mode, setMode] = useState<ProbeMode>('idle')

  /** 最新清单: 检测流程从这里取站点, 让对外回调保持稳定引用 */
  const listRef = useRef(list)
  useEffect(() => {
    listRef.current = list
  }, [list])

  /** 运行序号, 页面卸载后递增让在途结果作废 */
  const runIdRef = useRef(0)

  /** 同一时间只允许一次检测 */
  const runningRef = useRef(false)

  useEffect(
    () => () => {
      runIdRef.current += 1
      runningRef.current = false
    },
    []
  )

  const patchSite = useCallback((index: number, patch: Partial<Site>) => {
    setList(prev => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }, [])

  const runSites = useCallback(
    async (sites: Site[], indices: number[]) => {
      const runId = runIdRef.current

      for (const index of indices) {
        if (runId !== runIdRef.current) return

        const site = sites[index]
        if (!site) continue

        patchSite(index, { msg: [], loading: true })

        /** 单个站点出错不影响后续站点, 且必须复位自身的检测中标记 */
        try {
          const msg: number[] = []
          for (let i = 0; i < PING_COUNTS; i += 1) {
            if (runId !== runIdRef.current) return

            const latency = await ping(site.url, site.headers, PING_TIMEOUT, 'headers')
            if (runId !== runIdRef.current) return

            msg.push(latency)
            patchSite(index, { msg: [...msg] })

            /** 失败与超时不再重试, 站点已不可用 */
            if (!latency) break
          }
        } catch (error) {
          err(`ServerStatus pingSites ${site.url}: ${String(error)}`)
        } finally {
          if (runId === runIdRef.current) patchSite(index, { loading: false })
        }
      }

      if (runId === runIdRef.current) {
        runningRef.current = false
        setMode('idle')
      }
    },
    [patchSite]
  )

  /** 启动检测, 已有任务在跑时返回 false */
  const start = useCallback(
    (sites: Site[], indices: number[], nextMode: ProbeMode) => {
      if (runningRef.current) return false

      runningRef.current = true
      setMode(nextMode)
      runSites(sites, indices)

      return true
    },
    [runSites]
  )

  const pingOne = useCallback(
    (index: number) => {
      const sites = listRef.current
      if (!start(sites, [index], 'one')) return

      /** 埋点置于业务逻辑之后 */
      t('网络探针.检测', { desc: sites[index]?.desc, url: sites[index]?.url })
    },
    [start]
  )

  const pingAll = useCallback(() => {
    if (runningRef.current) return

    const sites = getSitesList(subjectStore.origin)
    setList(sites)
    start(
      sites,
      sites.map((_item, index) => index),
      'all'
    )

    /** 埋点置于业务逻辑之后 */
    t('网络探针.全部检测')
  }, [start])

  return {
    /** 站点清单与各自的检测结果 */
    list,

    /** 当前运行模式 */
    mode,

    /** 检测单个站点 */
    pingOne,

    /** 重新取站点清单并逐个检测 */
    pingAll
  }
}
