/*
 * @Author: czy0729
 * @Date: 2026-06-11 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-11 15:07:48
 */
import type { ReactNode, WithViewStyles } from '@types'
import type { TextProps } from '../../text'
import type { RefreshState } from '../types'

/** 列表底部 Footer 组件属性 */
export type FooterProps = {
  /** 过滤文本，显示过滤了多少条敏感条目 */
  filterText?: string

  /** 替代空数据时的自定义组件 */
  footerEmptyDataComponent?: ReactNode

  /** 空数据提示文字 */
  footerEmptyDataText?: string

  /** 替代加载失败时的自定义组件 */
  footerFailureComponent?: ReactNode

  /** 加载失败提示文字 */
  footerFailureText?: string

  /** 替代没有更多数据时的自定义组件 */
  footerNoMoreDataComponent?: ReactNode

  /** 替代加载中时的自定义组件 */
  footerRefreshingComponent?: ReactNode

  /** 加载中提示文字 */
  footerRefreshingText?: string

  /** 底部文本的主题色类型 */
  footerTextType?: TextProps['type']

  /** 当前页码 */
  page?: number

  /** 总页数 */
  pageTotal?: number

  /** 当前刷新状态 */
  refreshState: RefreshState

  /** 是否显示看板娘 */
  showMesume?: boolean
}

/** 列表空数据 footer 属性 */
export type FooterEmptyDataProps = WithViewStyles<{
  /** 提示文本 */
  text?: string

  /** 是否显示 Mesume */
  showMesume?: boolean

  /** 文本类型 */
  textType?: TextProps['type']
}>

/** 列表加载失败 footer 属性 */
export type FooterFailureProps = {
  /** 提示文本 */
  text?: string

  /** 文本类型 */
  textType?: TextProps['type']
}

/** 列表没有更多数据 footer 属性 */
export type FooterNoMoreDataProps = {
  /** 过滤文本 */
  filterText?: string

  /** 是否显示 Mesume */
  showMesume?: boolean

  /** 文本类型 */
  textType?: TextProps['type']
}

/** 列表底部加载中 footer 属性 */
export type FooterRefreshingProps = {
  /** 提示文本 */
  text?: string

  /** 当前页码 */
  page?: number

  /** 总页数 */
  pageTotal?: number

  /** 文本类型 */
  textType?: TextProps['type']
}

/** RandomText 组件属性 */
export type RandomTextProps = {
  /** 文本类型 */
  type?: TextProps['type']

  /** 过滤文本 */
  text?: string
}
