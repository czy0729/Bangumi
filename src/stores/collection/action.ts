/*
 * @Author: czy0729
 * @Date: 2023-04-24 03:04:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:51:07
 */
import { toJS } from 'mobx'
import { confirm } from '@utils'
import fetch, { xhr } from '@utils/fetch'
import { fetchCollectionSingleV0 } from '@utils/fetch.v0'
import { SORT } from '@utils/subject/anime'
import {
  API_COLLECTION_ACTION,
  API_SUBJECT_UPDATE_WATCHED,
  FROZEN_FN,
  HTML_ACTION_SUBJECT_INTEREST_UPDATE,
  HTML_ACTION_SUBJECT_SET_WATCHED,
  MODEL_COLLECTION_STATUS
} from '@constants'
import {
  CollectionStatus,
  CollectionStatusValue,
  RatingStatus,
  SubjectId,
  SubjectType,
  UserId
} from '@types'
import subjectStore from '../subject'
import userStore from '../user'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 用户收藏按网站评分本地排序后入库 */
  sortUserCollectionsByScore = async (
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus
  ) => {
    const data = this.userCollections(userId, subjectType, type)
    const subjectIds = data.list.map(item => item.id)

    await subjectStore.init('rank')
    await subjectStore.init('nsfw')
    await subjectStore.fetchRanks(subjectIds)

    const list = data.list
      .slice()
      .sort((a, b) => SORT.rating(subjectStore.rank(a.id), subjectStore.rank(b.id), 's', 'r'))

    const key = 'userCollections'
    const stateKey = `${userId}|${subjectType}|${type}`
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: toJS(list)
        }
      }
    })

    // 只本地化自己的收藏概览
    if (userId === userStore.userInfo.username || userId === userStore.myUserId) {
      this.setUserCollectionsStroage()
    }
  }

  /** 主动删除列表中一个条目数据 */
  removeOneInUserCollections = (args: {
    userId: UserId
    subjectType: SubjectType
    type: CollectionStatus
    subjectId: SubjectId
  }) => {
    const { userId, subjectType, type, subjectId } = args || {}
    if (!subjectId) return false

    const key = 'userCollections'
    const stateKey = `${userId}|${subjectType}|${type}`
    const data = this.userCollections(userId, subjectType, type)
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: data.list.filter(item => item.id != subjectId)
        }
      }
    })

    this.save(key)
    return true
  }

  /** 移除一个条目的收藏状态 */
  removeStatus = (subjectId: SubjectId) => {
    const key = 'collectionStatus'
    this.setState({
      [key]: {
        [subjectId]: ''
      }
    })
    this.save(key)
    return true
  }

  // -------------------- action --------------------
  private showFailNotice = true

  /** 条目管理 */
  doUpdateCollection = (args: {
    subjectId: SubjectId
    status?: RatingStatus | ''
    tags?: string
    comment?: string
    rating?: string | number
    privacy?: any // 0 | 1
    noConsole?: boolean
  }) => {
    const { subjectId, status, tags, comment, rating, privacy, noConsole = false } = args || {}
    return new Promise(async resolve => {
      const data = await fetch({
        url: API_COLLECTION_ACTION(subjectId),
        method: 'POST',
        data: {
          status,
          tags,
          comment,
          rating,
          privacy
        },
        noConsole
      })

      // @todo 20220216 以下旧 API 不再响应敏感条目, 暂时使用请求网页代替
      if (data?.code === 404) {
        const interest = MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>(status)
        const failCallback = () => {
          confirm(
            `此次提交可能未成功，原因可能为：授权信息过期，可尝试重新登录；管理的是 NSFW 条目，需要注册两三个月后才能操作。\n若还没能解决，可尝试联系作者。`,
            () => {
              this.showFailNotice = false
            },
            '提示',
            FROZEN_FN,
            '暂不再提示',
            '知道了'
          )
        }

        xhr(
          {
            url: HTML_ACTION_SUBJECT_INTEREST_UPDATE(subjectId, userStore.formhash),
            data: {
              referer: 'subject',
              interest,
              rating,
              tags,
              comment,
              privacy,
              update: '保存'
            }
          },
          async () => {
            if (this.showFailNotice) {
              const collection = await fetchCollectionSingleV0({
                subjectId,
                userId: userStore.myId
              })

              // 更新后状态与提交的不一致
              if (collection?.type && Number(collection.type) !== Number(interest)) {
                failCallback()
              }
            }

            return resolve(true)
          },
          () => {
            failCallback()
            return resolve(true)
          }
        )
      } else {
        return resolve(true)
      }
    })
  }

  /** 更新书籍章节 */
  doUpdateBookEp = (args: { subjectId: SubjectId; chap?: string; vol?: string }) => {
    const { subjectId, chap, vol } = args || {}
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: chap,
        watched_vols: vol
      }
    })
  }

  /** 输入框更新章节进度 */
  doUpdateSubjectEp = (
    args: {
      subjectId: SubjectId
      watchedEps?: string | number
      watchedVols?: string | number
    },
    success?: () => any
  ) => {
    const { subjectId, watchedEps, watchedVols } = args || {}
    const query: Record<string, unknown> = {
      referer: 'subject',
      submit: '更新',
      watchedeps: watchedEps
    }
    if (watchedVols) query.watched_vols = watchedVols
    return xhr(
      {
        url: HTML_ACTION_SUBJECT_SET_WATCHED(subjectId),
        data: query
      },
      success
    )
  }
}
