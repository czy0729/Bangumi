/*
 * @Author: czy0729
 * @Date: 2026-07-19 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 06:32:23
 */
import { systemStore } from '@stores'
import { SEASON_LABELS } from './ds'

import type { Ep } from '@stores/subject/types'

/** 根据放送日期计算所属季度（分界线前 10 天归入下季） */
export function calcSeason(airDate: string) {
  const d = new Date(airDate)
  if (isNaN(d.getTime())) return { year: 0, quarter: 1 }
  let year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  let adj = month
  if (day >= 22 && month % 3 === 0) adj = month + 1
  if (adj > 12) {
    adj -= 12
    year += 1
  }
  const quarter = Math.ceil(adj / 3)
  return { year, quarter }
}

/** 组装左侧文本：季度/未看集数/下沉状态 */
export function getLeftText(
  seasonYear: number,
  quarter: number,
  airedUnwatched: number,
  hasNewEp: boolean,
  typeCn?: string
) {
  if (seasonYear <= 0) return ''
  const isAnime = typeCn === '动画'
  let text = isAnime ? `${seasonYear} ${SEASON_LABELS[quarter - 1]}` : String(seasonYear)
  if (airedUnwatched > 0) text += ` · ${airedUnwatched} 集未看`
  if (isAnime && systemStore.setting.homeSortSink && !hasNewEp) text += ` · 已下沉`
  return text
}

/** 获取下一集信息或「完结」 */
export function getNextInfo(eps: Ep[], showSplit: boolean = true) {
  if (!eps.length) return ''

  const nextEp = eps.find(ep => {
    if (!ep.airdate) return false
    const t = new Date(ep.airdate + 'T00:00:00Z').getTime()
    if (isNaN(t)) return false
    return Math.round((t - Date.now()) / 86400000) > 0
  })
  if (!nextEp?.airdate) return '完结'

  const nextTime = new Date(nextEp.airdate + 'T00:00:00Z').getTime()
  if (isNaN(nextTime)) return ''
  const days = Math.round((nextTime - Date.now()) / 86400000)
  let info = `ep${nextEp.sort}${showSplit ? ' · ' : ' '}${String(nextEp.airdate).slice(2)}`
  if (days > 0) info += ` (${days} 天后)`
  return info
}
