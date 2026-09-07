/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 */
import type React from 'react'
import type { ReactNode, TextStyle } from '@types'

/** a 点击回调 */
export type OnPress = (navigation?: null, href?: string, payload?: { _cn?: string }) => void

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
  onPress?: OnPress

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
  onPress?: OnPress
}

/** 媒体块渲染回调, 传入 null 表示解析失败或无需渲染 */
export type MediaRender = (el: React.ReactElement | null) => void

/** getSubject / getTopic / getMono 公共参数 */
export type MediaArgs = {
  /** render-html 传递的参数 */
  passProps?: PassProps

  /** URL 解析参数 */
  params: Record<string, string>

  /** 链接地址 */
  href?: string

  /** 链接点击回调 */
  onLinkPress?: () => void

  /** 媒体信息就绪后的主动渲染回调 */
  onRender?: MediaRender
}

/** useA 参数 */
export type UseAOptions = Pick<Props, 'style' | 'attrs' | 'passProps' | 'onPress'>

/** 媒体块类型, 空字符串表示按文字链接渲染 */
export type MediaType = '' | 'ac' | 'subject' | 'topic' | 'mono'

/** getMediaType 参数 */
export type GetMediaTypeOptions = {
  /** 链接解析出的路由 */
  route?: string

  /** 是否客户端内部链接 */
  app?: boolean

  /** 帖子 Id */
  topicId?: string

  /** 是否开启媒体块匹配 */
  matchLink?: boolean

  /** 是否开启 AC 搜索 */
  acSearchV2?: boolean
}
