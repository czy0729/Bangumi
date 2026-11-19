/*
 * @Author: czy0729
 * @Date: 2026-11-20 06:59:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-11-20 06:59:46
 *
 * InView 可见性 context
 *
 * InView 的 keepMounted 模式下 children 常驻挂载, 由 InView 把 shown 写入本 context,
 * 叶子图片组件消费后自行延迟发起加载
 * - 默认 true: 未接入 context 的用法 (含 WEB fast path) 视为可见
 * - shown 单向上翻永久保持, 不会出现 true → false
 * - 图片的下载 / 测量 / 渲染都以此为准, 不可见期间只保留占位底色
 */
import { createContext, useContext } from 'react'

export const InViewContext = createContext(true)

/** 当前是否处于已展示的 InView 范围内 (或未接入 context, 视为可见) */
export function useInViewVisible() {
  return useContext(InViewContext)
}
