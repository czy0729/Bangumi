/*
 * @Author: czy0729
 * @Date: 2024-05-02 22:54:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-02 22:54:50
 */
import { Fn } from '@types'
import { TextProps } from '../text'

export type Props = TextProps

export type Context = {
  active: boolean
  lineHeightIncrease: number
  onKatakana: Fn
}
