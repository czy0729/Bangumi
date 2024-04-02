/*
 * @Author: czy0729
 * @Date: 2024-04-02 11:01:30
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-02 11:01:30
 */
import { Fn } from '@types'

export type Props = {
  title?: string
  visible?: boolean
  leftItem?: any
  rightItem?: any
  onClose?: Fn
  onSubmit?: Fn
}
