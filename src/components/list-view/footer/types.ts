/*
 * @Author: czy0729
 * @Date: 2026-06-11 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-11 15:07:48
 */
import type { WithViewStyles } from '@types'
import type { TextProps } from '../../text'

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
