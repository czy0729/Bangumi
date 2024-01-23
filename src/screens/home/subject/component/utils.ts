/*
 * @Author: czy0729
 * @Date: 2024-01-23 16:11:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 16:24:28
 */
/** 后来发现有翻译数据出现反转的情况, 判断符合情况需要再反转 */
export function fixedTranslateResult(translateResult: any[], content: string) {
  if ((translateResult?.length || 0) <= 1) return translateResult

  const str = translateResult[translateResult.length - 1]?.src || ''
  if (str && content && content.startsWith(str)) {
    return translateResult.slice().reverse()
  }

  return translateResult
}
