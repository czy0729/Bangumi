/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:08:23
 */
import type { LayoutChangeEvent } from 'react-native'
import type { SpaceType } from './utils'
import type { TextStyle, ViewStyle } from '@types'

/** 词云单词 */
export type Word = {
  index: number
  _placeFirstWord: (word: Word) => void
  _placeOtherWord: (word: Word) => void
  text: string
  value: number
  fontFactor: number
  fontOffset: number
  minValue: number
  fontFamily: string
  font: number
  color: string
  view: React.ReactElement | null
  width: number | null
  height: number | null
}

/** 词云单词配置 */
export type WordConfig = {
  index: number
  _placeFirstWord: (word: Word) => void
  _placeOtherWord: (word: Word) => void
  text: string
  value: number
  fontFactor: number
  fontOffset: number
  minValue: number
  fontFamily: string
  color: string
}

/** 词云剩余空间 */
export type Space = {
  spaceType: SpaceType
  width: number
  height: number
  x: number
  y: number
}

/** 词云配置 */
export type WordCloudOptions = {
  words: Array<{
    text: string
    value: number
    color: string
  }>
  verticalEnabled?: boolean
  minFont?: number
  maxFont?: number
  fontOffset?: number
  width: number
  height: number
  fontFamily?: string
}

/** Props */
export type Props = {
  style?: ViewStyle
  options?: WordCloudOptions
  onPress?: (word: string) => void
}

/** 文字组件 Props */
export type TextProps = {
  style?: TextStyle
  onPress?: () => void
  onLayout?: (event: LayoutChangeEvent) => void
  children?: React.ReactNode
}
