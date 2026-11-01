/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录列表与排序状态机
 */
import { useCallback, useEffect, useState } from 'react'
import { usersStore } from '@stores'
import { feedback, getStorage, setStorage } from '@utils'
import { ORDER_DS, SORT_DS, STORAGE_KEY_ORDER, STORAGE_KEY_SORT } from '../ds'
import { sortCatalogs } from '../utils'

import type { CatalogsItem } from '@stores/users/types'
import type { SortOrder, SortType } from '../types'

/**
 * 目录列表与排序状态机
 */
export function useSort() {
  const [list, setList] = useState<CatalogsItem[]>([])
  const [sortType, setSortType] = useState<SortType>(SORT_DS[0].value)
  const [sortOrder, setSortOrder] = useState<SortOrder>(ORDER_DS[0].value)

  /** 缓存列表 (按当前排序规则) */
  const updateList = useCallback(
    (nextSortType?: SortType, nextSortOrder?: SortOrder) => {
      const type = nextSortType ?? sortType
      const sequence = nextSortOrder ?? sortOrder
      setList(sortCatalogs(usersStore.catalogs().list, type, sequence))
    },
    [sortType, sortOrder]
  )

  /** 工具栏排序: 换字段, 同字段则切换升降序 */
  const onSortType = useCallback(
    (next: SortType) => {
      if (next !== sortType) {
        setSortType(next)
        setStorage(STORAGE_KEY_SORT, next)
        updateList(next)
      } else {
        const sequence: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(sequence)
        setStorage(STORAGE_KEY_ORDER, sequence)
        updateList(undefined, sequence)
      }

      feedback(true)
    },
    [sortType, sortOrder, updateList]
  )

  /** 读取本地化排序设置 */
  useEffect(() => {
    const init = async () => {
      const storedSortType = (await getStorage<SortType>(STORAGE_KEY_SORT)) || SORT_DS[0].value
      const storedSortOrder = (await getStorage<SortOrder>(STORAGE_KEY_ORDER)) || ORDER_DS[0].value
      setSortType(storedSortType)
      setSortOrder(storedSortOrder)
    }
    init()
  }, [])

  return {
    /** 按当前排序规则缓存的目录列表 */
    list,

    /** 工具栏排序字段 */
    sortType,

    /** 工具栏升 / 降序 */
    sortOrder,

    /** 缓存列表 (按当前排序规则) */
    updateList,

    /** 工具栏排序 */
    onSortType
  }
}
