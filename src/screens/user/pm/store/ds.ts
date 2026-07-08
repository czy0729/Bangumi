/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:12:21
 */
import type { Loaded } from '@types'

export const EXCLUDE_STATE = {
  /** 当前选中线程 ID，'' 表示全部 */
  thread: '',

  /** 高亮线程标签 ID（Label 组件通过此值匹配触发呼吸动画） */
  highlightedThreadId: '',

  /** 高亮触发计数（递增强制 Label 组件 useEffect 重新执行） */
  highlightTick: 0
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 新建短信标题 */
  title: '',

  /** 回复内容 */
  value: '',

  /** 回复占位符 */
  placeholder: '',

  /** 回复子条目 */
  replySub: '',

  /** 消息 */
  message: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
