/*
 * @Author: czy0729
 * @Date: 2024-06-13 16:21:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-13 16:22:49
 */
/** 去除 emoji */
export function removeHtmlEntities(str: string) {
  // 使用正则表达式匹配 HTML 实体字符
  return str.replace(/&#?[a-zA-Z0-9]+;/g, '')
}
