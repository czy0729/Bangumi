/*
 * @Author: czy0729
 * @Date: 2022-06-13 08:07:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 22:11:30
 */
import { Fn, SubjectId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 详情页模式, 显示 SP 和更多的操作按钮 */
  advance?: boolean

  /** 是否有播放源 */
  canPlay?: boolean

  /** 章节数据 */
  eps?: any[] | readonly any[]

  /** 外部是否网格模式 */
  grid?: boolean

  /** 外部容器宽度 */
  layoutWidth?: number

  /** 最大显示多少行 */
  lines?: number

  /** 是否已登录 */
  login?: boolean

  /** 容器右侧的 margin 值 */
  marginRight?: number

  /** 1 行多少个, 为了美观, 通过计算按钮占满 1 行, iPad 会忽略 */
  numbersOfLine?: number

  /** 是否分页, 1 页 4 行按钮, 不分页显示 1 页, 分页会显示 Carousel */
  pagination?: boolean

  /** 条目 Id */
  subjectId?: SubjectId

  /** 用户收藏记录 */
  userProgress?: object

  /** 目前的设备方向 */
  orientation?: string

  /** 按钮是否在改变状态后的使用切换动画 */
  flip?: boolean

  /** 切换动画完成后回调 */
  onFliped?: Fn

  /** 选择回调 */
  onSelect?: (value?: string, item?: object, subjectId?: SubjectId) => void

  /** @deprecated 长按回调 */
  // onLongPress?: (item?: object, subjectId?: SubjectId) => void
}
