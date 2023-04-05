/*
 * @Author: czy0729
 * @Date: 2022-06-02 15:34:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:41:49
 */
import { TextProps } from 'react-native'
import { Fn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 数据 */
  data: any[]

  /** 数据 id: number */
  counts: Record<string, number>

  /** 封面宽度 */
  width?: number

  /** 封面高度 */
  height?: number

  /** @deprecated */
  quality?: false

  /** 是否条目名字查找中文 */
  findCn?: boolean

  ellipsizeMode?: TextProps['ellipsizeMode']

  /** 没有拨动前渲染的个数 */
  initialRenderNums?: number

  /** 是否懒渲染 */
  scrolled?: boolean

  /** item 点击回调 */
  onPress?: Fn

  /** item 描述点击回调 */
  onSubPress?: Fn
}
