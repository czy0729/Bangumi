/*
 * @Author: czy0729
 * @Date: 2024-05-02 22:54:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-15 05:30:00
 */
import type { TextProps } from '../text'

export type Props = TextProps

export type KatakanaContextValue = {
  /** 是否启动 (强制 active 或设置开启) */
  enabled: boolean

  /** 匹配到片假名并翻译完成后回调 */
  onKatakana: (data: { jp: string; en: string }) => void
}
