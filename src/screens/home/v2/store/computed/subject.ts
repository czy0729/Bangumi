/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:37
 */
import { computed } from 'mobx'
import { _, subjectStore, systemStore, userStore } from '@stores'
import { freeze } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { logger } from '@utils/dev'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { NAMESPACE, PAGE_LIMIT_GRID, PAGE_LIMIT_LIST } from '../ds'
import {
  formatCountRight,
  getCurrentOnAir,
  getEpsCount,
  getEpsNoSp,
  getNextWatchEp,
  getVisibleEps
} from '../utils'
import Base from './base'

import type { Id, SubjectId } from '@types'

export default class Subject extends Base {
  /** 条目信息 */
  subject = computedFn((subjectId: SubjectId) => {
    return freeze(subjectStore.subject(subjectId))
  })

  /** 条目章节数据 (排除 SP) */
  epsNoSp = computedFn((subjectId: SubjectId) => getEpsNoSp(this.subject(subjectId).eps))

  /** 用户条目收视进度 */
  userProgress = computedFn((subjectId: SubjectId) => {
    return freeze(userStore.userProgress(subjectId))
  })

  /** 已看过的章节数量 */
  watchedCount = computedFn(
    (subjectId: SubjectId) =>
      Object.values(this.userProgress(subjectId)).filter(status => status === '看过').length
  )

  /** 条目章节数据 */
  eps = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
        try {
          const eps = this.epsNoSp(subjectId)

          // 一页章节按钮显示的最大数量
          const maxLength =
            systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
              ? this.pageLimitGrid(subjectId)
              : PAGE_LIMIT_LIST

          return getVisibleEps(eps, this.userProgress(subjectId), maxLength)
        } catch (error) {
          logger.error(NAMESPACE, 'eps', error)
        }

        return []
      })()
    )
  })

  /** 过滤 SP 后的章节 */
  epsNoType1 = computedFn((subjectId: SubjectId) =>
    this.eps(subjectId).filter(item => item.type !== 1)
  )

  /** 排除 SP 章节的长度 */
  epsCount = computedFn((subjectId: SubjectId, filterZero: boolean = true) =>
    getEpsCount(this.subject(subjectId), filterZero)
  )

  /** 条目下一个未看章节 */
  nextWatchEp = computedFn(
    (
      subjectId: SubjectId
    ): {
      id?: Id
      sort?: number
    } => {
      return freeze(
        (() => {
          try {
            return getNextWatchEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
          } catch (error) {
            logger.error(NAMESPACE, 'nextWatchEp', error)
          }

          return {}
        })()
      )
    }
  )

  /** 当前放送到的章节 */
  currentOnAir(subjectId: SubjectId) {
    try {
      return getCurrentOnAir(this.epsNoSp(subjectId))
    } catch (error) {
      logger.error(NAMESPACE, 'currentOnAir', error)
      return 0
    }
  }

  /** 总章节 */
  totalEps(subjectId: SubjectId) {
    try {
      const eps = this.epsNoSp(subjectId)
      return (
        Math.max(this.subject(subjectId)?.eps_count || 0, eps?.[eps.length - 1]?.sort || 0) || '??'
      )
    } catch (error) {
      logger.error(NAMESPACE, 'totalEps', error)
      return '??'
    }
  }

  /** 已看过的章节 */
  watchedEps = computedFn((subjectId: SubjectId) => {
    const userProgress = this.userProgress(subjectId)
    return this.epsNoSp(subjectId).filter(item => userProgress[item.id] === '看过')
  })

  /** subject 中的 epStatus 未必准确, 需要手动算一个对比 */
  epStatus(subjectId: SubjectId) {
    return this.watchedEps(subjectId).length
  }

  /** 网格布局实际显示的章节一行多少个 */
  numbersOfLineGrid = computedFn((subjectId: SubjectId) =>
    _.isMobileLanscape
      ? 12
      : systemStore.setting.homeGridEpAutoAdjust
      ? _.device(this.epsCount(subjectId, false) <= 18 ? 6 : 7, 8)
      : _.device(7, 8)
  )

  /** 网格布局实际显示的章节多少行 */
  @computed get linesGrid() {
    return _.isMobileLanscape ? 1 : 3
  }

  /** 网格布局实际显示的章节按钮数目 */
  pageLimitGrid = computedFn(
    (subjectId: SubjectId) => this.numbersOfLineGrid(subjectId) * this.linesGrid || PAGE_LIMIT_GRID
  )

  /** 显示数字组合 */
  countRight = computedFn((subjectId: SubjectId) => {
    const current = this.currentOnAir(subjectId)
    const total = this.totalEps(subjectId)
    return formatCountRight(current, total)
  })
}
