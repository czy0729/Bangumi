/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-12 05:56:39
 *
 * 目录详情获取与评分补全
 */
import { collectionStore, discoveryStore, subjectStore, userStore } from '@stores'
import { confirm, info, optimize, sleep } from '@utils'
import { queue } from '@utils/fetch'
import { gets } from '@utils/kv'
import { D1, M2 } from '@constants'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

import type { Subject } from '@stores/subject/types'
import type { SubjectId } from '@types'
import type { SubjectFromOSS } from '../types'

export default class Fetch extends Computed {
  /** 目录详情 */
  fetchCatalogDetail = async (refresh: boolean = false) => {
    if (refresh || !optimize(this.catalogDetail, M2)) {
      await discoveryStore.fetchCatalogDetail(this.catalogId)
    }

    this.fetchCollectionStatusQueue()
    return this.catalogDetail
  }

  /** 延迟获取收藏中的条目的具体收藏状态 */
  fetchCollectionStatusQueue = () => {
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        this.list.filter(item => item.isCollect).map(item => item.id)
      )
    }, 160)
  }

  /** 批量获取条目评分 (目录没有条目的当前评分, 需要额外获取) */
  fetchSubjectsQueue = () => {
    if (!userStore.isLogin) {
      info('请先登录')
      return
    }

    const list = this.list
    confirm(
      `更新 ${list.length} 个条目的评分?`,
      async () => {
        this.setState({
          progress: {
            fetching: true,
            message: '更新条目信息',
            current: 1,
            total: list.length
          }
        })

        // 第一步：批量获取 OSS 数据（过滤已缓存的条目）
        const now = Date.now() / 1000
        const needFetch: typeof list = []
        list.forEach(item => {
          const { id } = item
          const subject = subjectStore.subject(id)
          if (subject._loaded && now - Number(subject._loaded) <= D1) return

          needFetch.push(item)
        })

        if (needFetch.length) {
          const keys = needFetch.map(item => `subject_${item.id}`)
          const ossData = await gets<SubjectFromOSS>(keys, [
            'rating',
            'rank',
            'type',
            'titleLabel',
            'ts'
          ])

          if (ossData) {
            const key = 'subjectFromOSS'
            const patch: Record<SubjectId, Partial<Subject>> = {}
            needFetch.forEach(item => {
              const data = ossData[`subject_${item.id}`]
              if (data && typeof data === 'object' && !Array.isArray(data)) {
                const { ts, rating, rank, type, titleLabel } = data

                // 只写回 OSS 实际有值的字段, 缺失或 null 会覆盖已有缓存
                // (Subject.rank 声明为 number, OSS 里无排名是 '')
                const value: Partial<Subject> = {}
                if (rating != null) value.rating = rating
                if (rank != null) value.rank = rank as number
                if (type != null) value.type = type
                if (titleLabel != null) value.titleLabel = titleLabel
                if (ts != null) value._loaded = ts
                patch[item.id] = value
              }
            })

            if (Object.keys(patch).length) {
              subjectStore.setState({ [key]: patch })
              subjectStore.save(key)
            }
          }
        }

        // 第二步：逐个检查 rank，没有排名的需要单独请求
        const fetchs: (() => Promise<void>)[] = []
        list.forEach(({ id }) => {
          fetchs.push(async () => {
            const rank =
              subjectStore.subject(id)?.rank || subjectStore.subjectFromOSS(id)?.rank || ''
            if (!rank) {
              await subjectStore.fetchSubject(id, 'small')
            } else {
              await sleep(16)
            }

            this.setState({
              progress: {
                current: this.state.progress.current + 1
              }
            })
          })
        })

        await queue(fetchs, 2)
        this.setState({
          progress: EXCLUDE_STATE.progress
        })
      },
      '提示'
    )
  }
}
