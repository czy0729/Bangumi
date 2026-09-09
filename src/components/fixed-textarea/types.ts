/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:16:58
 */
import type { PropsWithChildren, ReactNode, RefObject } from 'react'
import type { TextInput, TextInputSelectionChangeEvent } from 'react-native'

export type Props = PropsWithChildren<{
  /** 输入框值 */
  value?: string

  /** 外部插入文本后, 光标移到末尾的触发器 */
  cursorEnd?: number

  /** 输入框提示信息 */
  placeholder?: string

  /** 是否开启简易模式 (只包含输入部分功能) */
  simple?: boolean

  /** 是否回复显示来源于 [平台] 宣传语 */
  source?: boolean

  /** 在 TextArea 下方设置常用短语 */
  marks?: string[] | readonly string[]

  /** 输入框下方额外渲染的组件 */
  extraComponent?: ReactNode

  /** 关闭回调 */
  onClose?: () => void

  /** 输入框改变回调 */
  onChange?: (value: string) => void

  /** 提交回调 */
  onSubmit?: (value: string) => void
}>

export type State = {
  /** 输入框文本 */
  value: string

  /** 光标位置 */
  selection: {
    start: number
    end: number
  }

  /** 是否显示 bgm 面板 */
  showBgm: boolean

  /** 键盘占位控件 */
  showKeyboardSpacer: boolean

  /** 是否显示回复历史 */
  showReplyHistory: boolean

  /** 是否显示源码模式 */
  showSource: boolean

  /** 源码模式文本 */
  showSourceText: boolean

  /** 是否显示输入框 */
  showTextarea: boolean

  /** 表情分组选中索引 */
  emojisGroupSelectedIndex: number

  /** 键盘高度 */
  keyboardHeight: number

  /** 最近使用 bgm 表情 id 列表 */
  history: number[]

  /** 回复历史列表 */
  replyHistory: string[]

  /** 置顶的回复历史文本 */
  lockHistory: string
}

/** 对外通过 ref 暴露的实例方法 */
export type FixedTextareaInstance = {
  /** 聚焦输入框 */
  onFocus: () => void
}

/** useTextareaValue 参数 */
export type UseTextareaValueOptions = Pick<Props, 'value' | 'cursorEnd' | 'onChange'> & {
  /** 最新输入值镜像, 供提交 / 卸载存草稿等非渲染期读取 */
  valueRef: RefObject<string>

  /** 输入框 TextInput 引用 (调用时懒读取) */
  textAreaRef: RefObject<TextInput | null>

  /** 插入符号 / 表情前聚焦输入框 */
  focusInput: () => void

  /** 选择 bgm 表情后记录最近使用 */
  onSelectRecentBgm?: (id: number) => void
}

/** useTextareaValue 返回值 */
export type UseTextareaValueReturn = {
  /** 输入框文本 */
  value: string

  /** 光标位置 */
  selection: State['selection']

  /** 文字改变回调 */
  handleChange: (value: string) => void

  /** 光标改变回调 */
  handleSelectionChange: (event: TextInputSelectionChangeEvent) => void

  /** 插入符号 / BBCode / 表情文本 */
  addSymbolText: (symbol: string, isText?: boolean) => void

  /** 选择 bgm 表情 */
  selectBgm: (key: string | number, updateRecent?: boolean) => void

  /** 设定光标位置 */
  setSelection: (start: number) => void

  /** 清空文本并复位光标 */
  resetValue: () => void
}

/** usePanelController 参数 */
export type UsePanelControllerOptions = Pick<Props, 'simple' | 'onClose'> & {
  /** 输入框 TextInput 引用 (调用时懒读取) */
  textAreaRef: RefObject<TextInput | null>

  /** 收起输入框时保存草稿 */
  saveDraft: () => void
}

/** usePanelController 返回值 */
export type UsePanelControllerReturn = {
  /** 是否显示输入框 */
  showTextarea: boolean

  /** 是否显示 bgm 面板 */
  showBgm: boolean

  /** 是否显示回复历史 */
  showReplyHistory: boolean

  /** 是否编辑态 (输入框或任一面板展开) */
  editing: boolean

  /** 获取焦点回调 */
  handleFocus: () => void

  /** 失去焦点回调 */
  handleBlur: () => void

  /** 显示 bgm 表情选择块 */
  handleShowBgm: () => void

  /** 隐藏 bgm 表情选择块 */
  handleHideBgm: () => void

  /** 显示最近回复历史框 */
  handleShowReplyHistory: () => void

  /** 收起最近回复历史框 */
  handleHideReplyHistory: () => void

  /** 仅收起输入框 (不清空文本) */
  collapse: () => void

  /** 聚焦输入框 */
  focusInput: () => void
}

/** useReplyHistory 返回值 */
export type UseReplyHistoryReturn = {
  /** 最近使用 bgm 表情 id 列表 */
  history: number[]

  /** 回复历史列表 */
  replyHistory: string[]

  /** 置顶的回复历史文本 */
  lockHistory: string

  /** 记录最近使用的 bgm 表情 */
  setRecentUseBgm: (id: number) => void

  /** 保存回复历史 */
  saveReplyHistory: (value: string) => void

  /** 切换锁定某个最近的回复 */
  onLockHistory: (text: string) => boolean | undefined
}

/** useStorageSync 返回值 */
export type UseStorageSyncReturn = {
  /** 是否显示右下角宣传文案 */
  showSource: boolean

  /** 是否显示左下角宣传文案实际内容 */
  showSourceText: boolean

  /** 表情分组选中索引 */
  emojisGroupSelectedIndex: number

  /** 显示 / 隐藏右下角宣传文案 */
  onToggleSource: () => void

  /** 显示 / 隐藏左下角宣传文案实际内容 */
  onToggleSourceText: () => void

  /** 选择表情组 */
  onEmojisGroupChange: (label: string) => void
}

/** useKeyboard 返回值 */
export type UseKeyboardReturn = {
  /** 键盘占位控件是否显示 */
  showKeyboardSpacer: boolean

  /** 键盘高度 */
  keyboardHeight: number

  /** 键盘展开回调 */
  onToggleKeyboard: (isOpen: boolean, keyboardHeight: number) => void

  /** 复位键盘占位控件显示状态 */
  resetKeyboardSpacer: () => void
}
