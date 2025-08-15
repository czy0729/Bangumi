/*
 * @Author: czy0729
 * @Date: 2023-03-28 05:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 05:39:05
 */
import { Fn } from '@types'

export type Props = {
  height: number
  onAnimated?: Fn
  children: any
} & {
  [key: string]: any
}
