/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录展开 / 收起状态机
 */
import { useCallback, useEffect, useState } from 'react'
import { getStorage, setStorage } from '@utils'
import { STORAGE_KEY_EXPAND } from '../ds'

import type { Id } from '@types'
import type { UseExpandOptions } from './types'

/**
 * 目录展开 / 收起状态机
 *
 * @param options.dirtyRef 写操作过的目录 Id, 重新展开时对它们强制刷新一次详情
 */
export function useExpand({ dirtyRef, onSubjectEdit, fetchCollectStatusQueue, syncFormhash }: UseExpandOptions) {
  const [expand, setExpand] = useState<Id[]>([])

  /** 展开 / 收起目录 */
  const onExpand = useCallback(
    (item: { id: Id }) => {
      const isExpand = expand.includes(item.id)
      const next = isExpand ? expand.filter(i => i != item.id) : [...expand, item.id]
      setExpand(next)
      setStorage(STORAGE_KEY_EXPAND, next)
      onSubjectEdit()

      fetchCollectStatusQueue(item.id)

      // 操作过的目录在重新展开时强制刷新一次详情, 收起再展开也以最新数据为准
      if (!isExpand && dirtyRef.current.has(item.id)) {
        dirtyRef.current.delete(item.id)
        syncFormhash(item.id, true)
      }
    },
    [expand, dirtyRef, onSubjectEdit, fetchCollectStatusQueue, syncFormhash]
  )

  /** 读取本地化展开项 */
  useEffect(() => {
    const init = async () => {
      const storedExpand = await getStorage(STORAGE_KEY_EXPAND)
      if (Array.isArray(storedExpand)) setExpand(storedExpand)
    }
    init()
  }, [])

  return {
    /** 展开的目录 id 列表 */
    expand,

    /** 外部写入展开项 */
    setExpand,

    /** 展开 / 收起目录 */
    onExpand
  }
}
