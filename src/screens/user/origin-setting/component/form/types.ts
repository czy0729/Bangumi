/*
 * @Author: czy0729
 * @Date: 2026-03-03 11:39:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 */
import type { InputProps } from '@components'
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 名字 */
  name: string

  /** 网址 */
  url: string

  /** 预设项只允许改排序 */
  isBase?: boolean

  /** 输入框聚焦时滚动到可视区 */
  onScrollIntoViewIfNeeded: InputProps['onScrollIntoViewIfNeeded']
}>

export type Params = {
  /** 插入内容 */
  key: string

  /** 说明 */
  label: string

  /** 直接插入符号 (否则以 [KEY] 形式插入) */
  insert?: boolean
}[]
