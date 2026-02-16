/*
 * @Author: czy0729
 * @Date: 2022-06-02 15:34:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:47:46
 */
import { TextProps } from 'react-native'
import { Fn, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 数据 */
  data: any[] | readonly any[]

  /** 数据 id: number */
  counts?: Record<string, number>

  /** 封面宽度 */
  width?: number

  /** 封面高度 */
  height?: number

  /** @deprecated */
  quality?: false

  /** 是否条目名字查找中文 */
  findCn?: boolean

  /** 条目类型中文 */
  typeCn?: SubjectTypeCn | '角色' | ''

  /** 关联条目类型中文, 若有值则相关描述例如`不同演绎`会沿用此类型值 */
  relationTypeCn?: SubjectTypeCn | '角色' | ''

  /** 文本溢出显示方式, 在例如单行本中能显示话数, 而不会被溢出折叠 (iOS only) */
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
