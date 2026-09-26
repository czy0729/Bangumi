/*
 * @Author: czy0729
 * @Date: 2026-09-26 22:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 00:14:48
 *
 * 目录条目纯逻辑: 类型计数统计 / 数据源选择 / 坏目录判定 / 文本解码
 */
import { HTMLDecode, removeHTMLTag } from '@utils'
import { DATA_CATALOG_TYPE_MAP } from '@constants'

import type { CatalogDetail, CatalogDetailFromOSS } from '@stores/discovery/types'
import type { CatalogCount, CatalogData, IsBadCatalogOptions } from './types'

type CountKey = keyof typeof DATA_CATALOG_TYPE_MAP

/**
 * 统计各类型条目数, 并得出占比最高的类型 (同票先到先得)
 *
 * @param typeProps 条目计数键值对
 */
export function getCatalogCount(typeProps: Record<string, number | undefined>): CatalogCount {
  let total = 0
  let maxKey: CountKey | null = null
  let maxValue = 0
  for (const key of Object.keys(DATA_CATALOG_TYPE_MAP) as CountKey[]) {
    const v = typeProps[key] || 0
    total += v
    if (v > maxValue) {
      maxValue = v
      maxKey = key
    }
  }

  return {
    /** 条目总数 */
    total,

    /** 占比最高的条目类型 */
    typeCn: maxKey ? DATA_CATALOG_TYPE_MAP[maxKey] : undefined
  }
}

/**
 * 选择条目数据源: 本地详情有内容优先, 云快照兜底, 都没有回落本地详情
 *
 * @param detailValue 本地详情
 * @param oss 云快照
 */
export function getCatalogData(detailValue: CatalogDetail, oss: CatalogDetailFromOSS): CatalogData {
  if (detailValue._loaded && detailValue.list.length) return detailValue
  if (oss._loaded) return oss
  return detailValue
}

/**
 * 是否别人创建且确认没有任何条目的坏目录 (显示为 +0), 自己创建的不受影响
 *
 * @param options 判定参数
 */
export function isBadCatalog({
  isUser,
  userId,
  selfIds,
  listLength,
  ossTotal,
  detailLoaded,
  ossLoaded
}: IsBadCatalogOptions) {
  return (
    isUser &&
    !selfIds.includes(String(userId)) &&
    !listLength &&
    !ossTotal &&
    (detailLoaded || ossLoaded)
  )
}

/**
 * 目录名称 (编纂者昵称)
 *
 * @param name 条目上的名称
 * @param userName 编纂者名称 (别人的才存在)
 * @param nickname 详情中的昵称
 */
export function getCatalogName(name?: string, userName?: string, nickname?: string) {
  return HTMLDecode(name || userName || nickname)
}

/**
 * 目录标题
 *
 * @param title 条目上的标题
 * @param detailTitle 详情中的标题
 */
export function getCatalogTitle(title?: string, detailTitle?: string) {
  return HTMLDecode(title || detailTitle)
}

/**
 * 目录描述: 解码去标签, 换行折叠为空格, 无效值返回空串
 *
 * @param info 条目上的描述
 * @param content 详情正文
 * @param ossInfo 云快照描述
 */
export function getCatalogDesc(info?: string, content?: string, ossInfo?: string) {
  const desc = HTMLDecode(removeHTMLTag(info || content || ossInfo, false))
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
  if (desc === 'undefined') return ''
  return desc
}
