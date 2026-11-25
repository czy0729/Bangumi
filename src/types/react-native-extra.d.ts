/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-25 12:00:00
 *
 * react-native 类型补充 (RN 自身类型未覆盖的原生 API, 以导出类型提供给调用处断言)
 */
import type { ComponentProps, ComponentRef } from 'react'

type RNTextInput = typeof import('react-native').TextInput
type RNTextInputProps = ComponentProps<RNTextInput>

/**
 * TextInput 实例
 *  - RN 0.72 的 TextInput 声明为 class, RN 0.88 为函数组件, 截取实例类型的方式不同
 *  - 两套依赖下都可用, 调用处不需要版本判断
 */
export type TextInputInstance = RNTextInput extends new (...args: never[]) => infer T
  ? T
  : ComponentRef<RNTextInput>

/**
 * TextInput 事件
 *  - 事件类型名各版本不一致: 0.72 是 XxxEventData, 0.88 是 XxxEvent, 且未全部从模块导出
 *  - 统一从 props 回调的形参推导
 */
export type FocusEvent = Parameters<NonNullable<RNTextInputProps['onFocus']>>[0]
export type BlurEvent = Parameters<NonNullable<RNTextInputProps['onBlur']>>[0]
export type TextInputSubmitEditingEvent = Parameters<
  NonNullable<RNTextInputProps['onSubmitEditing']>
>[0]
export type TextInputChangeEvent = Parameters<NonNullable<RNTextInputProps['onChange']>>[0]
export type TextInputSelectionChangeEvent = Parameters<
  NonNullable<RNTextInputProps['onSelectionChange']>
>[0]

/**
 * Android: 弹出系统原生菜单 (仅作为 PopMenuModule 缺失时的降级路径)
 * https://github.com/facebook/react-native/blob/main/Libraries/ReactNative/UIManager.js
 *  - RN 0.88 起 UIManager 的类型是内部 UIManagerJSInterface 且未从模块导出,
 *    无法再用 `declare module 'react-native'` 合并, 改为调用处交叉断言
 *  - 部分环境 (新架构 / 定制 ROM) 不提供此 API, 调用前需判空
 *  - 该 API 只接受 string[], 无文字颜色 / 图标 / 勾选能力
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
