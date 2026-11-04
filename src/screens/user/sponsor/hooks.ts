/*
 * @Author: czy0729
 * @Date: 2024-11-18 06:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 支持者页面逻辑与 treemap 排布状态
 */
import { useCallback, useMemo, useState } from 'react'
import { useInitStore } from '@stores'
import { feedback } from '@utils'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'
import { buildNodes, getMyIndex, getRangeFilterIds, squarifyNodes } from './utils'
import { LIST } from './ds'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 赞助者页面逻辑 */
export function useSponsorPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return context
}

/** treemap 数据与筛选状态, 尺寸由布局测量给出 */
export function useTreemapSquarify(width: number, height: number, myUserId: string, myId: string) {
  const [filterUserIds, setFilterUserIds] = useState<string[]>([])

  /** 自己在名单里的下标, -1 为未上榜 */
  const myIndex = getMyIndex(myUserId, myId)

  /** 隐藏一格 */
  const handleFilter = useCallback((id: string) => {
    setFilterUserIds(prev => [...prev, id])
  }, [])

  /** 只显示某一档, 其余全部隐藏 */
  const handleBatchFilter = useCallback((levelIndex: number) => {
    setFilterUserIds(getRangeFilterIds(levelIndex))
  }, [])

  /** 定位到自己: 隐藏排在自己前面的全部支持者, 再次点击还原 */
  const handleLocate = useCallback(() => {
    if (myIndex <= 0) return

    const before = LIST.slice(0, myIndex).map(item => item.data)
    const filterSet = new Set(filterUserIds)
    const located = filterUserIds.length === before.length && before.every(id => filterSet.has(id))

    setFilterUserIds(located ? [] : before)
    feedback()
  }, [filterUserIds, myIndex])

  /** 重置隐藏 */
  const handleResetFilter = useCallback(() => {
    setFilterUserIds([])
  }, [])

  /** 按筛选结果缓存排布节点 */
  const { nodes, hiddenCount } = useMemo(() => buildNodes(filterUserIds), [filterUserIds])
  const data = useMemo(
    () => (width && height ? squarifyNodes(nodes, width, height) : []),
    [nodes, width, height]
  )

  return {
    /** 排布后的节点 */
    data,

    /** 已隐藏的格子数 */
    filterLength: filterUserIds.length,

    /** 因占比过小未排布的格子数 */
    hiddenCount,

    /** 自己在名单里的下标, -1 为未上榜 */
    myIndex,

    /** 自己的 key, 未上榜为空字符串 */
    myData: myIndex >= 0 ? LIST[myIndex].data : '',

    /** 隐藏一格 */
    handleFilter,

    /** 只显示某一档 */
    handleBatchFilter,

    /** 定位到自己 */
    handleLocate,

    /** 重置全部隐藏 */
    handleResetFilter
  }
}
