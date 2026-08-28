/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:35:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:59:40
 */
import type { Setting } from '@stores/system/types'
import type { SetSettingKeys } from '../../types'

export type Props<T extends SetSettingKeys = SetSettingKeys> = {
  /** 设置项 */
  setting: T

  /** Segmented 选项 */
  values: readonly {
    label: string

    /** 选项值, 类型跟随 setting 对应的设置值 */
    value: Setting[T]
  }[]

  /** 设置项过滤 */
  filter: string

  /** 设置项标题 */
  hd: string

  /** 设置项补充说明 */
  information?: string

  /** 设置项外部缩略图说明 */
  thumb?: string[] | readonly string[]

  /** 部分设置项为了让用户直观感受, 本身在代码里面语义是相反的, 设置时需要反转一下 */
  reverse?: boolean
}
