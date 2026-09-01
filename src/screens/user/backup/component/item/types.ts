/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 21:01:16
 */
import type { WithNavigation } from '@types'
import type { Ctx, Item } from '../../types'
import type { memoStyles } from './styles'

export type Props = WithNavigation<{
  /** 组件样式 (DEFAULT_PROPS 注入) */
  styles?: ReturnType<typeof memoStyles>

  /** 收藏项 */
  item: Item

  /** 导入模式对应的收藏项 (DEFAULT_PROPS 注入) */
  upload?: ReturnType<Ctx['$']['upload']>

  /** 置底回调 (DEFAULT_PROPS 注入) */
  onBottom?: Ctx['$']['onBottom']

  /** 同步回调 (DEFAULT_PROPS 注入) */
  onSubmit?: Ctx['$']['onSubmit']
}>
