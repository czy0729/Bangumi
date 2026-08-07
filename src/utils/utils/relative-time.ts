/*
 * @Author: czy0729
 * @Date: 2026-08-07 06:41:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-07 06:41:15
 */
const LAST_DATE_UNITS = [
  { name: '年', seconds: 60 * 60 * 24 * 365 },
  { name: '月', seconds: 60 * 60 * 24 * 30 },
  { name: '周', seconds: 60 * 60 * 24 * 7 },
  { name: '天', seconds: 60 * 60 * 24 },
  { name: '时', seconds: 60 * 60 },
  { name: '分', seconds: 60 }
] as const

/** 时间戳距离现在时间的描述 */
export function lastDate(
  timestamp: number | string,
  simple: boolean = true,
  includeSeconds: boolean = false
) {
  if (!timestamp) return '刚刚'

  const units = includeSeconds
    ? [...LAST_DATE_UNITS, { name: '秒', seconds: 1 } as const]
    : LAST_DATE_UNITS

  let seconds = Math.floor(Date.now() / 1000 - Number(timestamp))
  let str = ''
  let hits = 0
  for (const unit of units) {
    if (hits >= 2) break

    const count = Math.floor(seconds / unit.seconds)
    if (count > 0) {
      const s = `${count}${unit.name}`
      if (simple) return `${s}前`

      str += s
      hits += 1
      seconds -= count * unit.seconds
    }
  }
  return str ? `${str}前` : '刚刚'
}

/** 中文相对时间（"3天15时前"）转 epoch 秒 */
export function relativeToEpoch(time: string, _loaded: number): number | undefined {
  if (!time.includes('前')) return

  const suffixMatch = time.match(/( · .+)$/)
  const relativePart = suffixMatch ? time.slice(0, -suffixMatch[1].length) : time

  const units: [string, number][] = [
    ['年', 60 * 60 * 24 * 365],
    ['月', 60 * 60 * 24 * 30],
    ['周', 60 * 60 * 24 * 7],
    ['天', 86400],
    ['时', 3600],
    ['分', 60],
    ['秒', 1]
  ]
  let offset = 0
  for (const [unit, seconds] of units) {
    const match = relativePart.match(new RegExp(`(\\d+)${unit}`))
    if (match) offset += parseInt(match[1]) * seconds
  }

  return offset > 0 ? _loaded - offset : undefined
}

/** 英文相对时间（"...1h 2m ago"）转 epoch 秒 */
export function relativeEnToEpoch(time: string, _loaded: number): number | undefined {
  const clean = time.replace(/^\.\.\./, '').trim()
  if (!clean.includes('ago')) return

  const relative = clean.replace(/\s*ago$/, '').trim()
  let offset = 0

  const y = relative.match(/(\d+)\s*y(?!\w)/)
  if (y) offset += parseInt(y[1]) * 60 * 60 * 24 * 365
  const mo = relative.match(/(\d+)\s*mo(?!\w)/)
  if (mo) offset += parseInt(mo[1]) * 60 * 60 * 24 * 30
  const w = relative.match(/(\d+)\s*w(?!\w)/)
  if (w) offset += parseInt(w[1]) * 60 * 60 * 24 * 7
  const d = relative.match(/(\d+)\s*d(?!\w)/)
  if (d) offset += parseInt(d[1]) * 86400
  const h = relative.match(/(\d+)\s*h(?!\w)/)
  if (h) offset += parseInt(h[1]) * 3600
  const m = relative.match(/(\d+)\s*m(?!\w)/)
  if (m) offset += parseInt(m[1]) * 60
  const s = relative.match(/(\d+)\s*s(?!\w)/)
  if (s) offset += parseInt(s[1])

  return offset > 0 ? _loaded - offset : undefined
}
