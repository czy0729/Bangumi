/*
 * @Author: czy0729
 * @Date: 2024-08-18 04:08:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * 请求: 按页从 OSS 拉取条目快照, 提炼名称/日期/原作/导演等展示字段
 */
import { collectionStore } from '@stores'
import { getTimestamp } from '@utils'
import { logger } from '@utils/dev'
import { gets } from '@utils/kv'
import Computed from './computed'
import { normalizeOssSubject, OSS_SUBJECT_PICKER } from './utils'

import type { SubjectId } from '@types'
import type { OssSubject } from '../types'

export default class Fetch extends Computed {
  /** 这个接口太慢了, 而且不太依赖, 暂时屏蔽 */
  fetchSubjects = () => {
    return true
  }

  fetchSubjectsFromOSS = async (ids: SubjectId[]) => {
    if (!ids.length) return true

    const { subjects } = this.state
    const now = getTimestamp()
    const fetchIds: string[] = []
    ids.forEach(id => {
      // maybe nsfw
      if (!this.subject(id).id) {
        const { _loaded } = subjects[id] || {}
        if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
            fetchIds.push(`subject_${id}`)
          }
        }
      }
    })
    if (!fetchIds.length) return true

    try {
      logger.info('fetchSubjectsFromOSS', fetchIds)

      const data = await gets<OssSubject>(fetchIds, [...OSS_SUBJECT_PICKER])
      Object.entries(data).forEach(([key, item]) => {
        try {
          if (!item) return

          data[key] = normalizeOssSubject(item, getTimestamp())
        } catch {}
      })

      this.setState({
        subjects: data as Record<string, OssSubject>
      })
      this.save()
    } catch {}

    collectionStore.fetchCollectionStatusQueue(ids)
  }
}
