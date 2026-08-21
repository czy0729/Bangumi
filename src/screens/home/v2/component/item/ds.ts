/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:11:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 09:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Subject, SubjectId } from '@types'
import type { TabsLabel } from '../../types'

export const COMPONENT = rc(PARENT, 'Item')

export const COMPONENT_MAIN = rc(COMPONENT)

export const SEASON_LABELS = ['冬', '春', '夏', '秋'] as const

export const SEASON_COLORS = ['#7EC8E8', '#F09CB0', '#8CD4B8', '#F5C898'] as const

/** 条目高度（普通布局） */
export const ITEM_HEIGHT = 154

/** 条目高度（紧凑列表布局） */
export const ITEM_HEIGHT_COMPACT = 114

/** 条目追加高度（番剧信息底部内联时） */
export const ITEM_HEIGHT_INFO_INLINE = 30

export const DEFAULT_PROPS = {
  index: 0 as number,
  title: '' as TabsLabel,
  subjectId: 0 as SubjectId,
  type: '2' as Subject['type'],
  image: '' as Subject['images']['medium'],
  name: '' as Subject['name'],
  name_cn: '' as Subject['name_cn'],
  doing: 0 as Subject['collection']['doing'],

  /** 看到多少集 */
  epStatus: '' as string | number,

  /** 收藏时间 (游戏才有) */
  time: '' as string
}
