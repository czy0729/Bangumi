/*
 * @Author: czy0729
 * @Date: 2023-04-24 03:04:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 07:11:22
 */
import { toJS } from 'mobx'
import { confirm } from '@utils'
import { logger } from '@utils/dev'
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
import subjectStore from '../subject'
import userStore from '../user'
import Fetch from './fetch'

import type {
  CollectionStatus,
  CollectionStatusCn,
  CollectionStatusValue,
  SubjectId,
  SubjectType,
  UserId
} from '@types'
import type { HeatmapType } from '@utils/kv/type'
import type { UpdateCollectionPrivacy, UpdateCollectionStatus } from './types'

export default class Action extends Fetch {
  /** 设置瓷砖数据类型: 全应用唯一, 本地化保存 */
  setMosaicTileType = (type: HeatmapType) => {
    this.setState({ mosaicTileType: type })
    this.save('mosaicTileType')
  }

  /** 用户收藏按网站评分本地排序后入库 */
  sortUserCollectionsByScore = async (
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus,
    shouldAbort?: () => boolean
  ) => {
    const subjectIds = this.userCollections(userId, subjectType, type).list.map(item => item.id)

    await subjectStore.init('rank')
    await subjectStore.init('nsfw')
    await subjectStore.fetchRanks(subjectIds)

    // 评分获取期间列表可能被刷新, 排序必须基于最新数据
    const data = this.userCollections(userId, subjectType, type)
    const list = data.list
      .slice()
      .sort((a, b) => SORT.rating(subjectStore.rank(a.id), subjectStore.rank(b.id), 's', 'r'))

    // 已有更新的请求链时放弃写回, 避免覆盖新结果
    if (shouldAbort?.()) return false

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
      this.saveUserCollections()
    }

    return true
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

  /** 移除一个条目收藏信息 */
  removeCollection = (subjectId: SubjectId) => {
    const STATE_KEY = 'collection'
    const ITEM_KEY = subjectId

    try {
      delete this.state[STATE_KEY][ITEM_KEY]
      this.save(STATE_KEY)
    } catch (error) {
      this.error('removeCollection', error)
    }

    return true
  }

  /** 移除一个条目收藏状态 */
  removeStatus = (subjectId: SubjectId) => {
    const STATE_KEY = 'collectionStatus'
    const ITEM_KEY = subjectId

    this.setState({
      [STATE_KEY]: {
        [ITEM_KEY]: '' as CollectionStatusCn
      }
    })
    this.save(STATE_KEY)

    return true
  }

  /** 清空指定用户收藏概览数据（用于切换排序方向等场景） */
  clearUserCollections = (
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus,
    forMilestone: boolean = false
  ) => {
    const STATE_KEY = forMilestone ? 'userCollectionsForMilestone' : 'userCollections'
    const ITEM_KEY = `${userId}|${subjectType}|${type}`

    this.setState({
      [STATE_KEY]: {
        [ITEM_KEY]: {
          list: [],
          pagination: { page: 0, pageTotal: 0 },
          _loaded: 0
        }
      }
    })
  }

  // -------------------- action --------------------
  private showFailNotice = true

  /** 条目管理 */
  doUpdateCollection = (args: {
    subjectId: SubjectId
    status?: UpdateCollectionStatus
    tags?: string
    comment?: string
    rating?: string | number
    privacy?: UpdateCollectionPrivacy
    noConsole?: boolean
  }) => {
    const { subjectId, status, tags, comment, rating, privacy, noConsole = false } = args || {}

    return new Promise(async resolve => {
      let data: { code?: number; error?: string } | undefined
      try {
        data = (await fetch({
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
        })) as { code?: number; error?: string } | undefined
      } catch (error) {
        // 网络失败不能当成功, 交由调用方提示失败
        logger.error('Collection', 'doUpdateCollection', error)
        return resolve(false)
      }

      // @todo 20220216 以下旧 API 不再响应敏感条目, 暂时使用请求网页代替
      if (data?.code === 404) {
        const interest = MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>(status)
        const failCallback = () => {
          // 「暂不再提示」仅抑制该解释性 confirm, 失败判定与弹窗层轻提示不受影响
          if (!this.showFailNotice) return

          confirm(
            `此次提交可能未成功。若为登录状态已过期，请重新登录后再试；管理 NSFW 条目需账号注册满三个月，且已在网页端设置页面勾选「显示受限条目内容」。\n若还没能解决，可尝试联系作者。`,
            FROZEN_FN,
            '提示',
            () => {
              this.showFailNotice = false
            },
            '知道了',
            '暂不再提示'
          )
        }

        // 网页兜底依赖 xhr readyState 收尾且无超时, 连接停滞时兜底 resolve, 避免提交永久挂起
        const fallbackTimeout = setTimeout(() => resolve(false), 15000)

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
            clearTimeout(fallbackTimeout)

            const collection = await fetchCollectionSingleV0(userStore.myId, subjectId)

            // 更新后状态与提交的不一致: 按失败收尾 (confirm 解释原因, 弹窗层保持打开并轻提示)
            if (collection?.type && Number(collection.type) !== Number(interest)) {
              failCallback()
              return resolve(false)
            }

            return resolve(true)
          },
          () => {
            clearTimeout(fallbackTimeout)
            failCallback()
            // 网页兜底提交失败: 按失败收尾, 弹窗层保持打开并提示重试
            return resolve(false)
          }
        )
        // 网页兜底完成前不 resolve (15s 超时兜底), 失败按失败收尾, 不再当成功
        return
      }

      // 接口明确返回错误 (如授权失效), 不再当成功
      if (data?.error) {
        return resolve(false)
      }

      return resolve(true)
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
      noConsole?: boolean
    },
    success?: () => void
  ) => {
    const { subjectId, watchedEps, watchedVols, noConsole = false } = args || {}
    const query: Record<string, string | number | boolean> = {
      referer: 'subject',
      submit: '更新',
      watchedeps: watchedEps
    }
    if (watchedVols) query.watched_vols = watchedVols

    return xhr(
      {
        url: HTML_ACTION_SUBJECT_SET_WATCHED(subjectId),
        data: query,
        noConsole
      },
      success
    )
  }
}
