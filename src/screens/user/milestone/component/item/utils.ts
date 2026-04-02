/*
 * @Author: czy0729
 * @Date: 2026-03-24 21:07:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 21:12:11
 */
export function getLastParts(str: string, count: number = 1) {
  try {
    if (!str) return ''

    // 如果没有斜杠，则视为非法格式返回空
    if (!str.includes('/')) return ''

    // 使用 ' / ' 分割并过滤掉空字符串（防止末尾有空格导致的空元素）
    const parts = str
      .split('/')
      .map(p => p.trim())
      .filter(Boolean)

    // 如果请求的数量大于 1，则截取最后 N 个并用斜杠重新连接
    if (count > 1) {
      return parts.slice(-count).join(' / ')
    }

    // 默认返回最后一个
    return parts.pop() || ''
  } catch {
    return ''
  }
}

export function getPartAfterDate(str: string, count: number = 1) {
  try {
    if (!str || !str.includes('/')) return ''

    // 按斜杠拆分并清理空格
    const parts = str.split('/').map(p => p.trim())

    // 定义一个能识别各种日期格式的正则（不带末尾斜杠匹配）
    // 兼容：2024-05-20, 2026年1月3日, 2014/11/07(美国)
    const datePattern = /\d{4}[年\/-]\d{1,2}[月\/-]\d{1,2}/

    // 寻找包含日期的那一部分所在的索引
    const dateIndex = parts.findIndex(part => datePattern.test(part))

    // 如果没找到日期，或者日期就是最后一项，返回空
    if (dateIndex === -1 || dateIndex === parts.length - 1) return ''

    // 根据 count 提取后续部分, slice(开始索引, 结束索引)
    const resultParts = parts.slice(dateIndex + 1, dateIndex + 1 + count)

    return resultParts.join(' / ')
  } catch {
    return ''
  }
}
