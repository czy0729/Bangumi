/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 08:10:45
 */
import type { PropsWithChildren, ReactNode } from 'react'

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
