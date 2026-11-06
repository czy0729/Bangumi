/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 12:00:00
 *
 * react-native 类型补充 (RN 自身类型未覆盖的原生 API, 以导出类型提供给调用处断言)
 */

/**
 * Android: 弹出系统原生菜单
 * https://github.com/facebook/react-native/blob/main/Libraries/ReactNative/UIManager.js
 *  - RN 0.88 起 UIManager 的类型是内部 UIManagerJSInterface 且未从模块导出,
 *    无法再用 `declare module 'react-native'` 合并, 改为调用处交叉断言
 *  - 部分环境 (新架构 / 定制 ROM) 不提供此 API, 调用前需判空
 *  - index 由原生侧回传, 可能是字符串
 */
export type ShowPopupMenu = (
  /** 锚点原生节点句柄 */
  tag: number,

  /** 菜单项文案 */
  items: string[],

  /** 失败回调 */
  error: () => void,

  /** 选中回调 */
  success: (item: string, index: number | string) => void
) => void

/** 带系统原生菜单 API 的 UIManager, 交叉断言用 */
export type UIManagerWithPopupMenu = {
  /** Android: 弹出系统原生菜单 */
  showPopupMenu?: ShowPopupMenu
}
