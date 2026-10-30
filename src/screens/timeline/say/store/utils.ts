/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页纯函数工具
 */

/**
 * 解析提交接口的响应文本
 *
 * @param responseText 接口返回文本
 */
export const parseStatus = (responseText: string) => {
  try {
    return (JSON.parse(responseText) as { status?: string }).status
  } catch {
    return undefined
  }
}
