/*
 * @Author: czy0729
 * @Date: 2022-07-30 15:52:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 17:40:48
 */
import type { TextStyle, WithViewStyles } from '@types'
import type { PassProps } from './a/types'

export type Props = WithViewStyles<{
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

  /** 是否使用 a 渲染内嵌链接 */
  matchLink?: boolean

  /** 分割大表情前后吸附的文字长度断点 */
  splitLength?: number

  /** 是否对内嵌片假名使用片假名终结者模块 */
  katakana?: boolean

  /** 复写内嵌链接点击回调 */
  onLinkPress?: (href?: string) => void

  /** 框架不支持图片的时候, 点击图片后回调 */
  onImageFallback?: (src?: string) => void
}>

/** react-native-render-html 自定义渲染器回调类型 */
export type Renderer = (
  /** 当前 HTML 标签的属性对象 */
  attrs: Record<string, string>,

  /** 已渲染的子节点 */
  children: React.ReactNode,

  /** 转换后的 CSS 样式（未使用） */
  _css: Record<string, string | number>,

  /** render-html 透传参数 */
  passProps: PassProps
) => JSX.Element | null
