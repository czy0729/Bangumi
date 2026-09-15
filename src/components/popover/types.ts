/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:18:39
 */
import type { ReactElement, ReactNode, RefObject } from 'react'
import type { Insets, TouchableWithoutFeedbackProps, View } from 'react-native'
import type { ViewStyle, WithViewStyles } from '@types'
import type { TouchableHandlePress } from '../touchable'

/** 菜单项数据 */
export type PopoverData = readonly string[]

/** 激活方式 (tap-hold 为点击与长按共存, 长按优先) */
export type PopoverActivateOn = 'tap' | 'hold' | 'tap-hold'

/** 菜单方向 (历史调用点存在 auto, 各平台实现均未消费) */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'auto'

/** 选中位置信息 */
export type PopoverEvent = {
  pageX?: number
  pageY?: number
}

/** 菜单选择 */
export type PopoverOnSelect<Data extends PopoverData = PopoverData> = (
  /** 选中项文本 (未做简繁转换的原始数据) */
  title?: Data[number],

  /** 选中项索引 */
  index?: number,

  /** 触发位置 */
  evt?: PopoverEvent
) => void

/**
 * 平台实现共用的标准化属性
 *  - 出口层负责把外部 props 归一成此结构, 平台实现只认这里的字段
 */
export type PopoverImplProps<Data extends PopoverData = PopoverData> = {
  /** 菜单项 */
  data?: Data

  /** 菜单标题 (web 生效) */
  title?: string

  /** 菜单描述 (web 生效) */
  desc?: string

  /** 菜单方向 (三端实现均未消费, 仅兼容历史调用点) */
  placement?: PopoverPlacement

  /** 内容样式 (三端实现均未消费, 仅兼容历史调用点) */
  contentStyle?: ViewStyle

  /** 容器样式 (iOS: HoldItem 外层容器; Android: Touchable; Web: Dropdown 子元素) */
  style?: ViewStyle

  /** 点击热区 (仅 Android 消费) */
  hitSlop?: Insets | number

  /** 激活方式 (Web 不消费, 始终为点击) */
  activateOn?: PopoverActivateOn

  /** 菜单选择 (回传未做简繁转换的原始数据) */
  onSelect?: PopoverOnSelect<Data>

  /** 长按 (Android tap 模式下透传给 Touchable, iOS 下长按语义归调用方) */
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']

  children?: ReactNode
}

export type Props<Data extends PopoverData = PopoverData> = WithViewStyles<PopoverImplProps<Data>>

/** iOS hold-menu 菜单项 */
export type PopoverIOSItems = {
  text: string
  onPress?: (evt?: PopoverEvent) => void
  isTitle?: boolean
}[]

/**
 * Popover 调用签名
 *  - observer 包裹泛型函数会丢失泛型, 用接口显式声明调用签名保住 Data 推导
 */
export interface PopoverComponent {
  <Data extends PopoverData>(props: Props<Data>): ReactElement | null
}

/** iOS 菜单项派生参数 */
export type UsePopoverItemsOptions<Data extends PopoverData = PopoverData> = {
  /** 菜单项 */
  data?: Data

  /** 菜单标题 (置顶为不可选标题项) */
  title?: string

  /** 菜单选择 */
  onSelect?: PopoverOnSelect<Data>

  /** 外部长按回调 (存在时菜单降级为纯点击激活, 不抢占长按) */
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']

  /** 激活方式 */
  activateOn?: PopoverActivateOn
}

/** iOS 菜单项派生结果 */
export type UsePopoverItemsResult = {
  /** hold-menu 菜单项 (展示文案已转简繁, 回调仍回传原始数据) */
  items: PopoverIOSItems

  /** 兜底后的激活方式 */
  activateOn: PopoverActivateOn
}

/** Android 按压激活参数 */
export type UsePopoverPressOptions<Data extends PopoverData = PopoverData> = {
  /** 菜单项 */
  data?: Data

  /** 菜单选择 */
  onSelect?: PopoverOnSelect<Data>

  /** 长按回调 (tap 模式下透传给 Touchable) */
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']

  /** 激活方式 (hold 时长按打开菜单, 其余按点击处理) */
  activateOn?: PopoverActivateOn
}

/** Android 按压激活结果 */
export type UsePopoverPressResult = {
  /** 弹窗锚点 (只挂载到 View, 读取留在事件回调内) */
  anchorRef: RefObject<View | null>

  /** 按压延迟 (tap 模式下与长按区分) */
  delayPressIn?: number

  /** 点击 (tap 模式下打开菜单) */
  onPress?: TouchableHandlePress

  /** 长按 (hold 模式下打开菜单, tap 模式下透传外部回调) */
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']
}

/** Web 下拉参数 */
export type UsePopoverDropdownOptions<Data extends PopoverData = PopoverData> = {
  /** 菜单选择 */
  onSelect?: PopoverOnSelect<Data>
}

/** Web 下拉结果 */
export type UsePopoverDropdownResult<Data extends PopoverData = PopoverData> = {
  /** 下拉可见状态 */
  visible: boolean

  /** 可见状态变更 */
  onVisibleChange: (value: boolean) => void

  /** 选中 (先收起下拉再回调) */
  handleSelect: (title?: Data[number], index?: number) => void
}
