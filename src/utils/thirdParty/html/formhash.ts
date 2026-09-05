/*
 * @Author: czy0729
 * @Date: 2026-09-05 04:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 17:30:12
 */

/**
 * 从 HTML 中提取 formhash (bgm.tv 登录 token)
 * - 正则实现, 与解析引擎无关, 双引擎下行为一致
 * - 兼容 name/value 两种属性顺序、单双引号与等号两侧空格; 未命中返回空字符串
 * - name/value 前置边界用 \s 而非 \b: \b 无法排除 data-name="formhash"、
 *   data-x="value=..." 这类把目标词嵌在别的属性名/属性值里的写法
 */
export function getFormhash(html: string = ''): string {
  if (!html) return ''

  const input = html.match(/<input\b[^>]*\sname\s*=\s*(["']?)formhash\1(?=[\s/>])[^>]*>/i)?.[0]
  if (!input) return ''

  return input.match(/\svalue\s*=\s*(["']?)([^"'>]*)\1/i)?.[2] || ''
}
