/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:14:03
 */
import { toJS } from 'mobx'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { API_COLLECTIONS } from '@utils/fetch.v0/ds'
import { Collection } from '@utils/fetch.v0/types'
import { COLLECTION_STATUS, MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import {
  CollectionStatusValue,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue
} from '@types'
import { LIMIT } from '../ds'
import { actionStatus } from '../utils'
import Computed from './computed'
import { EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 循环获取所有类型和状态的条目收藏信息 */
  fetchCollectionsAll = async () => {
    if (this.state.progress.fetching) return false

    this.setState({
      anime: [],
      book: [],
      music: [],
      game: [],
      real: [],
      progress: {
        fetching: true,
        total: SUBJECT_TYPE.length * COLLECTION_STATUS.length
      }
    })

    try {
      let current = 0
      for (let i = 0; i < SUBJECT_TYPE.length; i += 1) {
        for (let j = 0; j < COLLECTION_STATUS.length; j += 1) {
          const subjectType = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(SUBJECT_TYPE[i].value)

          current += 1
          this.setState({
            progress: {
              current,
              message: `${subjectType} (${actionStatus(COLLECTION_STATUS[j].title, subjectType)}) `
            }
          })

          const result = await this.fetchCollections(
            SUBJECT_TYPE[i].value,
            COLLECTION_STATUS[j].title
          )
          if (!result) break
        }
        this.save()
      }

      this.setState({
        last: getTimestamp()
      })
      this.save()

      t('本地备份.获取', {
        userId: this.userId
      })
    } catch (error) {
      t('本地备份.报错', {
        userId: this.userId
      })
    } finally {
      this.setState({
        progress: EXCLUDE_STATE.progress
      })
    }
  }

  /** 获取收藏信息 */
  fetchCollections = async (
    subjectType: SubjectTypeValue,
    type: CollectionStatusValue,
    page: number = 1
  ) => {
    const data = await request<Collection>(
      API_COLLECTIONS(this.userId, subjectType, page, LIMIT, type)
    )
    const key = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectType)
    if (Array.isArray(data?.data)) {
      const list = data.data.map(item => {
        const { subject: s } = item || {}
        return {
          type: item.type,
          rate: item.rate,
          ep_status: item.ep_status,
          vol_status: item.vol_status,
          comment: item.comment,
          tags: item.tags,
          private: item.private,
          updated_at: item.updated_at,
          subject: {
            id: s?.id,
            date: s?.date,
            eps: s?.eps,
            image: s?.images?.medium,
            jp: s?.name,
            cn: s?.name_cn,
            rank: s?.rank,
            score: s?.score,
            type: item?.subject_type
          }
        }
      })

      this.setState({
        [key]: [...toJS(this.state[key]), ...list]
      })
    } else {
      return false
    }

    if (data.total && data.offset + LIMIT < data.total) {
      return this.fetchCollections(subjectType, type, page + 1)
    }

    return true
  }

  /** 更新一项收藏信息 */
  fetchCollection = async (subjectId: SubjectId) => {
    console.info(subjectId)
  }
}
