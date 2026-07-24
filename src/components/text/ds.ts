/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:41:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 05:41:41
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Text')

/** RNText 静态属性，避免重复创建 */
export const TEXT_STATIC_PROPS = {
  allowFontScaling: false,
  suppressHighlighting: true,
  lineBreakStrategyIOS: 'push-out',
  textBreakStrategy: 'simple',
  android_hyphenationFrequency: 'none',
  dataDetectorType: 'none'
} as const
