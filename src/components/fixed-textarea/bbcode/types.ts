/*
 * @Author: czy0729
 * @Date: 2026-03-07 05:09:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:03:43
 */
/** 光标选中范围 */
export type Selection = {
  /** 起始位置 */
  start: number

  /** 结束位置 */
  end: number
}

/** BBCode 插入结果 */
export type InsertResult = {
  /** 插入后的文本 */
  value: string

  /** 光标应处位置 */
  selection: Selection
}

/** BBCode 按键配置 */
export type BBCodeConfig = {
  /** 插入模板, $TEXT$ 会被选中文本替换 */
  insert: string

  /** 插入后光标从起始位置偏移的字符数 */
  offset: number
}
