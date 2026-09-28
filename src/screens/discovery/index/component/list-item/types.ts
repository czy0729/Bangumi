/*
 * @Author: czy0729
 * @Date: 2025-10-20 10:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 */
import type { HomeItem } from '@stores/calendar/types'
import type { SubjectType, WithViewStyles } from '@types'
import type { memoStyles } from './styles'

export type Props = WithViewStyles<{
  /** 列表索引 */
  index: number

  /** 频道类型 */
  type?: SubjectType
}>

export type MainProps = WithViewStyles<{
  /** 页面样式 */
  styles: ReturnType<typeof memoStyles>

  /** 列表索引 */
  index: number

  /** 频道类型 */
  type: SubjectType

  /** 频道条目列表 */
  list: HomeItem[]

  /** 好友频道聚合数据 */
  friendsChannel: HomeItem[]
}>
