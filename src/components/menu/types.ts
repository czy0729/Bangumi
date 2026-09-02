/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:02:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:43:47
 */
import type { ReactNode, WithViewStyles } from '@types'

/** 标题项，支持字符串或自定义渲染 */
type TitleItemType =
  | string
  | {
      /** 自定义类型标识 */
      type?: string

      /** 标题内容，支持 ReactNode */
      title: ReactNode

      /** 是否禁用该项 */
      disabled?: boolean
    }

/** 数据项，支持字符串或带类型的对象 */
type DataItemType =
  | string
  | {
      /** 自定义类型标识 */
      type?: string

      /** 显示文本 */
      title?: string
    }

export type Props = WithViewStyles<{
  /** 标题列表 */
  title?: TitleItemType[]

  /** 描述文本 */
  desc?: string

  /** 数据列表 */
  data?: readonly DataItemType[]

  /** 选中回调 */
  onSelect?: (
    /** 选中项的标题 */
    title?: string,

    /** 选中项的索引 */
    index?: number,

    /** 触发事件的位置信息 */
    evt?: {
      /** 点击位置的 X 坐标 */
      pageX?: number

      /** 点击位置的 Y 坐标 */
      pageY?: number
    }
  ) => void
}>
