/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { GROUP_THUMB_MAP } from '@assets/images'

import type { ImageSourcePropType } from 'react-native'

/** 根据文本长度计算字体大小 */
export function getTextSize(text: string): number {
  if (text.length >= 300) return 12
  if (text.length >= 200) return 13
  return 14
}

/** 按空行分割文本段落 */
export function splitParagraphs(text: string): string[] {
  return text.split('\n\n')
}

/** 获取人格头像图片源 */
export function getMusumeThumb(icon: keyof typeof GROUP_THUMB_MAP): ImageSourcePropType {
  return GROUP_THUMB_MAP[icon] as ImageSourcePropType
}