/*
 * @Author: czy0729
 * @Date: 2026-09-26 22:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 23:21:32
 *
 * 目录条目数据源 hook
 */
import { discoveryStore, userStore } from '@stores'
import { getCatalogData } from './utils'

import type { CatalogDetail } from '@stores/discovery/types'
import type { Id } from '@types'

/**
 * 读取目录条目数据源与自己的用户标识
 *
 * @param id 目录 Id
 * @param detail 外部传入的详情 (优先使用, 不再读 store)
 */
export function useCatalogData(id: Id, detail?: CatalogDetail) {
  const detailValue = detail || discoveryStore.catalogDetail(id)
  const oss = discoveryStore.catalogDetailFromOSS(id)

  return {
    /** 当前展示的数据源 */
    data: getCatalogData(detailValue, oss),

    /** 本地详情 */
    detailValue,

    /** 云快照 */
    oss,

    /** 自己的用户标识 (数字 Id 与改过后的用户名 ID) */
    selfIds: [String(userStore.myUserId || ''), String(userStore.myId || '')]
  }
}
