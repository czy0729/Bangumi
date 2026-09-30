/*
 * @Author: czy0729
 * @Date: 2026-09-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 00:00:00
 */
import type { ADVScreen } from '@stores/ota/types'
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  id: SubjectId

  /** 自建 CDN 截图数 (旧条目) */
  length?: number

  /** 在线截图 (VNDB, 数据侧已过滤 NSFW) */
  screens?: ADVScreen[]

  /** InView 可视判定 y */
  y: number
}
