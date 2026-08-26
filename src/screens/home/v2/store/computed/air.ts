/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:21
 */
import { computed } from 'mobx'
import { calendarStore, subjectStore, systemStore } from '@stores'
import { desc, freeze, getOnAir } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { MODEL_SETTING_HOME_SORTING } from '@constants'
import {
  getLastWatchedSort,
  getOnlineOrigins,
  getWatchedCount,
  hasNewEp as checkHasNewEp,
  isOnairNextDay,
  isOnairToday
} from '../utils'
import Subject from './subject'

import type { SettingHomeSorting, SubjectId } from '@types'

export default class Air extends Subject {
  /** 放送顺序 */
  @computed get sortOnAir() {
    return (
      systemStore.setting.homeSorting ===
      MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('放送')
    )
  }

  /** 云端 onAir 和自定义 onAir 组合判断 (自定义最优先) */
  onAirCustom = computedFn((subjectId: SubjectId) => {
    const onAir = calendarStore.onAirLocal(subjectId)
    const result = getOnAir(onAir, calendarStore.onAirUser(subjectId))

    // 若已知总集数且放送集数 >= 总集数，说明条目已完结，不应标记为放送中
    if (result.isOnair && onAir.air) {
      const s = this.subject(subjectId)
      if (s?.eps_count && Number(onAir.air) >= s.eps_count) {
        result.isOnair = false
      }
    }

    // 兜底：若 onAir.air 或 eps_count 缺失，但全部章节均已放送，标记为完结
    if (result.isOnair) {
      const s = this.subject(subjectId)
      const stillAiring = Number(onAir.air) > 0 && s?.eps_count && Number(onAir.air) < s.eps_count

      if (!stillAiring) {
        const eps = this.epsNoSp(subjectId)
        if (eps.length > 0 && eps.every(ep => ep.status === 'Air' || ep.status === 'Today')) {
          result.isOnair = false
        }
      }
    }

    return freeze(result)
  })

  /** 是否放送中 */
  isToday = computedFn((subjectId: SubjectId) => {
    const { weekDay, isOnair } = this.onAirCustom(subjectId)
    return isOnairToday(weekDay, isOnair)
  })

  /** 是否明天放送 */
  isNextDay = computedFn((subjectId: SubjectId) => {
    const { weekDay, isOnair } = this.onAirCustom(subjectId)
    return isOnairNextDay(weekDay, isOnair)
  })

  /** 是否存在没有看的章节 */
  hasNewEp = computedFn((subjectId: SubjectId) =>
    checkHasNewEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
  )

  /** 猜测条目当前看到的集数 */
  countFixed = computedFn((subjectId: SubjectId, epStatus: number | string) => {
    // 直接获取第一个看过章节的 sort
    const eps = this.epsNoType1(subjectId)
    const userProgress = this.userProgress(subjectId)
    const lastWatchedSort = getLastWatchedSort(eps, userProgress)
    if (lastWatchedSort !== undefined) return lastWatchedSort

    // 不能直接用 API 给的 epStatus, 会把 SP 都加上
    // 需要根据 userProgress 和 eps 排除掉 SP 算
    return Math.max(Number(epStatus || 0), getWatchedCount(userProgress, eps) || 0)
  })

  /** 在线源头数据 */
  onlineOrigins = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
        const { type } = this.subject(subjectId)
        return getOnlineOrigins(type, subjectStore.origin)
      })()
    )
  })

  /** 原始自定义跳转数据 */
  rawActions = computedFn((subjectId: SubjectId) => {
    return freeze(subjectStore.actions(subjectId))
  })

  /** 自定义跳转（过滤+排序后） */
  actions = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
        const actions = this.rawActions(subjectId)
        if (!actions.length) return actions

        return actions.filter(item => item.active).sort((a, b) => desc(a.sort || 0, b.sort || 0))
      })()
    )
  })
}
