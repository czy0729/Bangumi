/*
 * @Author: czy0729
 * @Date: 2026-08-07 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-07 10:00:00
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'collection' | 'typeCn' | 'name' | 'nameCn' | 'screen'> & {
  /** 纯数字条目 ID */
  subjectId: string
}
