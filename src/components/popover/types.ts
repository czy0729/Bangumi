/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 07:18:25
 */
import type { ReactElement, ReactNode, RefObject } from 'react'
import type { Insets, TouchableWithoutFeedbackProps, ViewInstance } from 'react-native'
import type { IconfontNames, ViewStyle, WithViewStyles } from '@types'
import type { TouchableHandlePress } from '../touchable'

import type { TextType } from '@components/text/types'

/**
 * 菜单项 (iOS hold-menu 渲染 icon 与文字颜色; Android PopMenuModule 渲染文字颜色与
 * 选中勾, icon 字段不生效; Web 降级为纯文本)
 */
export type PopoverItem = {
  /** 文本 */
  text: string

  /** 最右侧图标 (仅 iOS 渲染, Android 原生菜单暂不支持) */
  icon?: IconfontNames

  /** 是否为选中项 (iOS 右侧勾图标; Android 行末素色勾) */
  checked?: boolean

  /** 文字颜色类型 (全局 Text 语义色) */
  type?: TextType

  /** 显式文字颜色 (优先于 type; 用于语义色覆盖不到的场景, 如置灰零结果选项) */
  color?: string
}

/** 菜单项数据 */
export type PopoverData = readonly (string | PopoverItem)[]

/**
 * 三端共用的菜单条目 (派生层输出)
 *  - iOS 转成 hold-menu 的 MenuItem, Android 转成原生菜单的结构化数据, Web 取 text
 *  - index 固定为原始 data 下标, 标题项不占下标, 避免三端选中回调索引错位
 */
export type PopoverMenuEntry = {
  /** 展示文案 (已按设置做简繁转换) */
  text: string

  /** 原始数据 (选中回调原样回传) */
  raw: PopoverData[number]

  /** 原始数据下标 (标题项为 -1) */
  index: number

  /** 是否为选中项 (最右侧渲染勾图标) */
  checked: boolean

  /** 最右侧图标 (非选中项时渲染) */
  icon?: IconfontNames

  /** 文字颜色类型 */
  type?: TextType

  /** 显式文字颜色 */
  color?: string

  /** 标题项 (置顶、置灰、不可点) */
  isTitle?: boolean
}

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

  /**
   * 当前选中项 (选择型菜单)
   *  - 按原始文案匹配, 命中项自动渲染勾, 且不再查通用图标映射
   *  - 不传即为操作型菜单, 按文案查通用图标映射
   *  - 类型放宽为全局条目 (string | PopoverItem), 匹配是运行时按文本进行的
   */
  value?: PopoverData[number]

  /** 菜单标题 (iOS / Android 置顶为不可选标题项; Web 作为下拉标题) */
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

  /** 点击 (hold 模式下透传给 Touchable, 用于点击跳转与长按菜单共存) */
  onPress?: TouchableHandlePress

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
  icon?: IconfontNames
  checked?: boolean
  type?: TextType
  color?: string
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

  /**
   * 当前选中项 (选择型菜单)
   *  - 按原始文案匹配, 命中项自动渲染勾, 且不再查通用图标映射
   *  - 不传即为操作型菜单, 按文案查通用图标映射
   *  - 类型放宽为全局条目 (string | PopoverItem), 匹配是运行时按文本进行的
   */
  value?: PopoverData[number]

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

/** Android 系统菜单项 (color 为 parseArgb 后的带符号 32 位 ARGB 整数, 缺省跟随主题) */
export type PopMenuNativeItem = {
  /** 展示文案 (已简繁转换) */
  text: string

  /** 文字颜色 (带符号 32 位 ARGB 整数; 缺省跟随系统菜单主题色) */
  color?: number

  /** 选中项 (行末渲染素色勾, 与文字有固定间距) */
  checked: boolean

  /** 标题项 (原生 disabled 置灰、不可点) */
  isTitle: boolean

  /** 原始数据下标 (标题项为 -1) */
  index: number
}

/** Android 原生模块接口 (NativeModules.PopMenuModule) */
export type PopMenuModuleType = {
  /**
   * 弹出系统 PopupMenu (增强版)
   *  - anchorTag 为锚点 reactTag, 定位 / 动画由系统完成
   *  - dark 按框架 Material 主题切换深浅, 与 App 内主题设置一致
   *  - 取消时不回调, 选中时回传原始数据下标
   */
  show: (
    anchorTag: number,
    dark: boolean,
    items: PopMenuNativeItem[],
    onSelect: (index: number) => void
  ) => void
}

/** Android 命令式弹菜单参数 */
export type ShowAndroidPopMenuOptions<Data extends PopoverData = PopoverData> = {
  /** 锚点视图 (空 View, 由调用方挂载) */
  anchor?: ViewInstance | null

  /** 菜单项 */
  data?: Data

  /** 当前选中项 (选择型菜单) */
  value?: PopoverData[number]

  /** 菜单标题 (置顶为不可选标题项) */
  title?: string

  /** 菜单选择 */
  onSelect?: PopoverOnSelect<Data>

  /** 触发事件 (原样透传给 onSelect) */
  evt?: PopoverEvent
}

/** Android 按压激活参数 */
export type UsePopoverPressOptions<Data extends PopoverData = PopoverData> = {
  /** 菜单项 */
  data?: Data

  /** 当前选中项 (选择型菜单, 命中项渲染勾) */
  value?: PopoverData[number]

  /** 菜单标题 (置顶为不可选标题项) */
  title?: string

  /** 菜单选择 */
  onSelect?: PopoverOnSelect<Data>

  /** 点击 (hold 模式下透传给 Touchable) */
  onPress?: TouchableHandlePress

  /** 长按回调 (tap 模式下透传给 Touchable) */
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']

  /** 激活方式 (hold 时长按打开菜单, 其余按点击处理) */
  activateOn?: PopoverActivateOn
}

/** Android 按压激活结果 */
export type UsePopoverPressResult = {
  /** 弹窗锚点 (只挂载到 View, 读取留在事件回调内) */
  anchorRef: RefObject<ViewInstance | null>

  /** 按压延迟 (tap 模式下与长按区分) */
  delayPressIn?: number

  /** 点击 (tap 模式下打开菜单, hold 模式下透传外部回调) */
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
