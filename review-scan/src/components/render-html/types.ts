/*
 * @Author: czy0729
 * @Date: 2022-07-30 15:52:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-30 15:52:14
 */
import { TextStyle, ViewStyle } from '@types'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 基本字体样式 */
  baseFontStyle?: TextStyle

  /** 链接字体样式 */
  linkStyle?: TextStyle

  /** 内嵌图片最大宽度 */
  imagesMaxWidth?: number

  /** HTML */
  html?: string

  /** 是否自动加载显示图片 */
  autoShowImage?: boolean

  /** 是否使用 <A> 渲染内嵌链接 */
  matchLink?: boolean

  /** 是否对内嵌片假名使用片假名终结者模块 */
  katakana?: boolean

  /** 复写内嵌链接点击回调 */
  onLinkPress?: (href?: string) => any

  /** 框架不支持图片的时候, 点击图片后回调 */
  onImageFallback?: (src?: string) => any
}
