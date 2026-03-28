/*
 * @Author: czy0729
 * @Date: 2025-09-05 09:02:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-28 21:57:26
 */
const REG = /[\ue000-\uf8ff]/g

/** 获取 BGM 字符串中的中间帧 */
export function getBgmMiddleFrame(raw: string): string {
  if (!raw) return ''
  const frames = raw.match(REG)

  // 如果没有匹配到私有区字符，说明不是动画格式，直接返回原字符串
  if (!frames || frames.length === 0) return raw

  const mid = Math.floor((frames.length - 1) / 2)
  return frames[mid] || raw // 最后的兜底
}

/** 拆分动画帧 */
export function getBgmFrames(raw: string): string[] {
  if (!raw) return []
  const matches = raw.match(REG)
  // 如果匹配到多帧则返回数组，否则将整个 raw 作为单帧返回
  return matches && matches.length > 0 ? matches : [raw]
}

/** 获得客户端实际显示表情的字体名称 */
export function getBgmFontFamily(index: string | number) {
  const value = Number(index || 0)
  if (value >= 724) return 'bgm3'
  if (value >= 645) return 'bgm2'
  return 'bgm'
}
