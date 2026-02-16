/*
 * @Author: czy0729
 * @Date: 2024-06-14 16:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 17:28:10
 */
/** 扩大行高以尽量能完整显示文字 */
export function calcStyles(lineHeight: number) {
  const value = lineHeight * 2
  return {
    lineHeight: value,
    marginBottom: Math.floor(lineHeight / 2) * -1
  }
}

/** 去除特殊文字 */
export function removeSpecCharacters(text: string = '') {
  return text.replace(/[\u0f00-\u0fff]/g, '')
}
