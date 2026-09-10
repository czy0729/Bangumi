/*
 * @Author: czy0729
 * @Date: 2026-09-09 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:17:02
 *
 * 纯函数工具: bgm 表情占位符 / 提交文案拼接 / 光标插入 / 历史列表去重裁剪 / 键盘高度归一
 */
import { SOURCE_FLAG, SOURCE_TEXT } from './ds'

/** 计算选择 bgm 表情时插入的占位符文本 */
export function getBgmLabel(id: number): string {
  if (id >= 700) {
    // 700-799 -> (blake_00) - (blake_99)
    return `(blake_${String(id % 100).padStart(2, '0')})`
  }
  if (id >= 600) {
    // 600-699 -> (musume_00) - (musume_99)
    return `(musume_${String(id % 100).padStart(2, '0')})`
  }

  // 其他 -> (bgm01), (bgm123) 等
  return `(bgm${id})`
}

/**
 * 计算提交文案, 开启来源宣传语且文本中未包含时在末尾拼接
 *
 * @param value 输入框文本
 * @param source 是否回复显示来源于 [平台] 宣传语
 * @param showSource 宣传语开关是否打开
 */
export function getSubmitValue(value: string, source: boolean, showSource: boolean): string {
  if (!source || !showSource || value.includes(SOURCE_FLAG)) return value
  return `${value}${SOURCE_TEXT}`
}

/**
 * 在光标区间插入纯文本, 返回新文本与插入后的光标位置
 *
 * @param value 输入框文本
 * @param selection 光标区间
 * @param text 插入的文本
 */
export function insertTextAt(
  value: string,
  selection: {
    start: number
    end: number
  },
  text: string
): {
  value: string
  cursor: number
} {
  const before = value.slice(0, selection.start)
  const after = value.slice(selection.end)
  return {
    value: `${before}${text}${after}`,
    cursor: selection.start + text.length
  }
}

/**
 * 列表头部插入 (去重), 超出上限从尾部裁剪
 *
 * @param list 原列表
 * @param item 插入项
 * @param maxCount 上限数量
 */
export function upsertHistory<T>(list: T[], item: T, maxCount: number): T[] {
  const next = list.filter(current => current !== item)
  next.unshift(item)
  return next.slice(0, maxCount)
}

/**
 * 回复历史插入, 保证锁定的历史文本始终在列 (不再二次裁剪, 与原行为一致)
 *
 * @param replyHistory 回复历史列表
 * @param value 提交的文本
 * @param lockHistory 锁定的历史文本
 * @param maxCount 上限数量
 */
export function upsertReplyHistory(
  replyHistory: string[],
  value: string,
  lockHistory: string,
  maxCount: number
): string[] {
  const next = upsertHistory(replyHistory, value, maxCount)
  if (lockHistory && !next.includes(lockHistory)) next.unshift(lockHistory)
  return next
}

/**
 * 键盘高度归一: 扣除 iOS 工具条高度, 不低于入参记录的历史最大值;
 * iOS 弹出第三方键盘会慢一拍, 但可以肯定至少是 336 高度
 * 键盘切换中英文高度会变化, 历史最大值由调用方自行持有并写回
 *
 * @param keyboardHeight 键盘弹出事件高度
 * @param isIOS 是否 iOS
 * @param maxKeyboardHeight 历史最大键盘高度
 */
export function getKeyboardSpaceHeight(
  keyboardHeight: number,
  isIOS: boolean,
  maxKeyboardHeight: number
): {
  /** 归一后的键盘占位高度 */
  height: number

  /** 本次更新后的历史最大高度, 由调用方写回 */
  maxHeight: number
} {
  const deducted = keyboardHeight - (isIOS ? 24 : 0)
  const maxHeight = Math.max(deducted, maxKeyboardHeight)

  return {
    height: isIOS ? Math.max(336, maxHeight) : maxHeight,
    maxHeight
  }
}
