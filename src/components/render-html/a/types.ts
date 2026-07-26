/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:56:47
 */
import type { Fn, ReactNode, TextStyle } from '@types'

export type Props = {
  /** a 文字样式 */
  style?: TextStyle

  /** html 上的 a 的 attrs 参数 */
  attrs?: {
    href?: string
  }

  /** render-html 链接组件传递的参数 */
  passProps?: PassProps

  /** 点击回调 */
  onPress?: (navigation?: null, href?: string) => void

  /** 通常是文字或者嵌套的 a */
  children?: ReactNode | ReactNode[]
}

/** render-html 传递的 passProps 类型 */
export type PassProps = {
  /** React key */
  key?: string

  /** 基础字体样式 */
  baseFontStyle?: Record<string, string | number>

  /** 原始子节点 */
  rawChildren?: Array<{
    /** 文本内容 */
    data?: string

    /** 子节点 */
    children?: Array<{ data?: string }>
  }>
}

/** getACSearch 参数 */
export type ACSearchArgs = {
  /** 基础字体样式 */
  style?: TextStyle

  /** render-html 传递的参数 */
  passProps: PassProps

  /** URL 解析参数 */
  params: Record<string, string>

  /** 点击回调 */
  onPress?: (navigation?: null, href?: string) => void
}

/** getSubject / getTopic / getMono 公共参数 */
export type MediaArgs = {
  /** render-html 传递的参数 */
  passProps: PassProps

  /** URL 解析参数 */
  params: Record<string, string>

  /** 链接地址 */
  href?: string

  /** 链接点击回调 */
  onLinkPress?: Fn
}
