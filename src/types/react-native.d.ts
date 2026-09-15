/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:24:11
 *
 * react-native 类型增强 (RN 自身类型未覆盖的原生 API)
 */
import 'react-native'

declare module 'react-native' {
  interface UIManagerStatic {
    /**
     * Android: 弹出系统原生菜单
     * https://github.com/facebook/react-native/blob/main/Libraries/ReactNative/UIManager.js
     *  - 部分环境 (新架构 / 定制 ROM) 不提供此 API, 调用前需判空
     *  - index 由原生侧回传, 可能是字符串
     * */
    showPopupMenu(
      /** 锚点原生节点句柄 */
      tag: number,

      /** 菜单项文案 */
      items: string[],

      /** 失败回调 */
      error: () => void,

      /** 选中回调 */
      success: (item: string, index: number | string) => void
    ): void
  }
}
