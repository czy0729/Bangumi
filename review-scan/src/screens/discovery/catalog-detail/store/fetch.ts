/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 23:17:25
 */
import { collectionStore, discoveryStore, subjectStore } from '@stores'
import { confirm, opitimize, sleep } from '@utils'
import { queue } from '@utils/fetch'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 目录详情 */
  fetchCatalogDetail = async (refresh: boolean = false) => {
    if (refresh || !opitimize(this.catalogDetail, 120)) {
      await discoveryStore.fetchCatalogDetail({
        id: this.catalogId
      })
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
    confirm(
      `更新 ${this.list.length} 个条目的评分?`,
      async () => {
        const fetchs = []
        this.list.forEach(({ id }) => {
          fetchs.push(async () => {
            const result = await subjectStore.fetchSubjectFromOSS(id)
            if (!result) await subjectStore.fetchSubject(id, 'small')

            // 由于之前失误没有把排名存到云端
            const rank =
              subjectStore.subject(id)?.rank || subjectStore.subjectFromOSS(id)?.rank || ''
            if (!rank) {
              await subjectStore.fetchSubject(id, 'small')
            } else {
              // 用于制作进度条加载效果
              await sleep(16)
            }

            this.setState({
              progress: {
                current: this.state.progress.current + 1
              }
            })
          })
        })

        if (fetchs.length) {
          this.setState({
            progress: {
              fetching: true,
              message: '更新条目信息',
              current: 1,
              total: fetchs.length
            }
          })
        }

        await queue(fetchs, 2)
        this.setState({
          progress: EXCLUDE_STATE.progress
        })
      },
      '提示'
    )
  }
}
