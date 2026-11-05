/*
 * @Author: czy0729
 * @Date: 2024-02-29 18:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 瓷砖热力图: 页面标识与数据类型选项
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { HeatmapType } from '@utils/kv/type'

export const COMPONENT = rc(PARENT, 'MosaicTile')

/** 各类型的统计单位 */
export const TYPE_UNITS: Record<HeatmapType, string> = {
  all: '次活动',
  timeline: '次动态',
  community: '次活动',
  contributions: '次贡献'
}

/** 数据类型选项, 与 web 版 Heatmap 脚本的选项卡一致 */
export const HEATMAP_TYPES: {
  /** 展示文案 */
  label: string

  /** 数据类型 */
  value: HeatmapType
}[] = [
  { label: '全部', value: 'all' },
  { label: '时间胶囊', value: 'timeline' },
  { label: '社区', value: 'community' },
  { label: 'Wiki', value: 'contributions' }
]
