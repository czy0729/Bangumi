/*
 * @Author: czy0729
 * @Date: 2026-07-26 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:57:16
 */
import type { ReactNode } from '@types'
import type { PassProps } from '../a/types'

/** render-html 原始子节点 */
export type RawNode = {
  data?: string
  parent?: { children?: RawNode[] }
  children?: RawNode[]
}

/** 所有 renderer 函数的公共基础参数 */
export type BaseRendererProps = {
  /** React key */
  key?: string

  /** 子元素 */
  children?: ReactNode
}

/** 带样式的 renderer 参数 */
export type StyledRendererProps = BaseRendererProps & {
  /** 当前节点样式（CSS 字符串或样式对象） */
  style?: string | Record<string, string | number>

  /** CSS 类名 */
  className?: string
}

/** a 标签参数 */
export type ARendererProps = BaseRendererProps & {
  /** html 属性 */
  attrs?: { href?: string }

  /** render-html 传递的参数 */
  passProps?: PassProps

  /** 默认基础字体样式 */
  defaultBaseFontStyle?: Record<string, string | number | undefined>

  /** 基础字体样式 */
  baseFontStyle?: Record<string, string | number | undefined>

  /** 最大宽度 */
  maxWidth?: number

  /** 点击回调 */
  onPress?: (navigation?: null, href?: string) => void
}

/** img 标签参数 */
export type ImgRendererProps = BaseRendererProps & {
  /** 图片地址 */
  src?: string

  /** 替代文本 */
  alt?: string

  /** 自动尺寸（数字为最大宽度，boolean 为开关） */
  autoSize?: number | boolean

  /** 是否显示 */
  show?: boolean

  /** 图片加载失败回调 */
  onImageFallback?: (src?: string) => void
}

/** span 标签参数 */
export type SpanRendererProps = StyledRendererProps & {
  /** 默认基础字体样式 */
  defaultBaseFontStyle?: Record<string, string | number | undefined>

  /** 基础字体样式 */
  baseFontStyle?: Record<string, string | number | undefined>

  /** 原始子节点 */
  rawChildren?: RawNode[]
}

/** div 标签参数 */
export type DivRendererProps = StyledRendererProps & {
  /** html 属性 */
  attrs?: { style?: Record<string, string | number>; [key: string]: unknown }

  /** 原始子节点 */
  rawChildren?: RawNode[]
}
