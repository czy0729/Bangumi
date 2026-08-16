/*
 * @Author: czy0729
 * @Date: 2026-08-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 00:00:00
 */
import { createContext } from 'react'

/** 额外行高增量 (由 Katakana.Provider 提供, 让嵌套 Text 统一感知) */
export const LineHeightIncreaseContext = createContext(0)

export default LineHeightIncreaseContext
