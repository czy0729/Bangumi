/*
 * @Author: czy0729
 * @Date: 2026-07-24 23:09:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 23:09:53
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'title'> & {
  onClose?: () => void
}
