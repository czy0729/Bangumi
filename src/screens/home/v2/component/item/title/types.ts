/*
 * @Author: czy0729
 * @Date: 2024-11-14 20:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { TabsLabel } from '../../../types'
import type { Props as ItemProps } from '../types'

export type Props = Pick<ItemProps, 'subjectId'> & {
  /** 当前 Tab 标题 */
  title: TabsLabel

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string
}
