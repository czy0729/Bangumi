/*
 * @Author: czy0729
 * @Date: 2026-08-12 06:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 06:30:00
 */
import type { ActionSheetIOSOptions } from 'react-native'

/** 静态 ActionSheet 配置 (对齐 ActionSheetIOSOptions 子集) */
export type ActionSheetConfig = Pick<
  ActionSheetIOSOptions,
  'title' | 'message' | 'options' | 'cancelButtonIndex' | 'destructiveButtonIndex' | 'tintColor'
>

/** showActionSheet 配置: options 单独传参, 其余字段可选 */
export type ActionSheetConfigOptions = Omit<ActionSheetConfig, 'options'>

/** 选中某项回调 */
export type ActionSheetCallback = (index: number) => void
