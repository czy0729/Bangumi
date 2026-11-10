/*
 * @Author: czy0729
 * @Date: 2025-10-17 09:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目头像属性
 */
import type { AvatarProps } from '@components'

export type Props = Pick<AvatarProps, 'src' | 'userId' | 'name' | 'priority'> & {
  /** 无头像时的占位文案, 取首个文字/数字字符（跳过符号, 全是符号时取首个字符）, 整段用于背景指纹 */
  text?: string
}
