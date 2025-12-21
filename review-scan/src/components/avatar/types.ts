/*
 * @Author: czy0729
 * @Date: 2022-06-12 16:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:34:21
 */
import { AnyObject, ColorValue, EventType, Fn, Navigation, ViewStyle } from '@types'
import { ImageProps } from '../image'

export type Props = {
  /** 图片容器样式 */
  style?: ViewStyle

  /** 路由 */
  navigation?: Navigation

  /** 用户 id, 存在则允许点击进入用户空间 */
  userId?: number | string

  /** 用户昵称 */
  name?: string

  /** 头像地址 */
  src?: ImageProps['src']

  /** 大小 */
  size?: number

  /** 边框大小 */
  borderWidth?: number

  /** 边框颜色 */
  borderColor?: ColorValue

  /** 埋点事件 */
  event?: EventType

  /** 路由跳转额外传递参数 */
  params?: AnyObject

  /** 是否强制圆形 */
  round?: boolean

  /** 圆角大小 */
  radius?: number | boolean

  /** 是否显示底色 */
  placeholder?: boolean

  /** 错误回滚地址 */
  fallbackSrc?: string

  /** 图片同一时间有复数加载时的优先级 */
  priority?: ImageProps['priority']

  /** 是否显示骨架屏动画 */
  skeleton?: ImageProps['skeleton']

  /** 骨架屏渐变颜色风格 */
  skeletonType?: ImageProps['skeletonType']

  /** 点击回调, 会覆盖跳转到用户空间的事件 */
  onPress?: Fn

  /** 长按回调 */
  onLongPress?: Fn
}
