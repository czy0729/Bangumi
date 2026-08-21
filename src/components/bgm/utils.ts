/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { HOST } from '@constants'

/** BGM 表情总数（需与原生 assets.ts 的 require 条目数保持一致） */
export const BGM_COUNT = 102

/** 生成 BGM 表情 URL 映射（键为字符串索引，值为图片地址） */
export function getBgmMap(): Record<string, string> {
  const map: Record<string, string> = {}
  for (let i = 1; i <= BGM_COUNT; i += 1) {
    map[i.toString()] = `${HOST}/img/smiles/tv/${i.toString().padStart(2, '0')}.gif`
  }
  return map
}
