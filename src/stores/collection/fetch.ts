/*
 * @Author: czy0729
 * @Date: 2023-04-24 03:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 19:26:18
 */
import { getTimestamp, info, queue, sleep } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { fetchCollectionSingleV0, request } from '@utils/fetch.v0'
import {
  API_COLLECTION,
  API_MOSAIC_TILE,
  API_USERS_SUBJECT_COLLECTION,
  COLLECTION_STATUS,
  H,
  H12,
  HTML_USER_COLLECTIONS,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE,
  WEB
} from '@constants'
import userStore from '../user'
import { cheerioUserCollections, cheerioUserCollectionsTags } from './common'
import Computed from './computed'
import { DEFAULT_COLLECTION_STATUS, DEFAULT_ORDER, DEFAULT_SUBJECT_TYPE, NAMESPACE } from './init'

import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type {
  CollectionStatusCn,
  Fn,
  ResponseApi,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UserId
} from '@types'
import type {
  Collection,
  CollectionStatusLastFetchMS,
  FetchUserCollectionsArgs,
  UserCollectionStatus
} from './types'

export default class Fetch extends Computed {
  /** 只本地化自己的收藏概览 */
  saveUserCollections = () => {
    const { userCollections } = this.state
    const data = {}
    Object.keys(userCollections).forEach(key => {
      if (
        key.includes(`${userStore.userInfo.username}|`) ||
        key.includes(`${userStore.myUserId}|`)
      ) {
        data[key] = userCollections[key]
      }
    })
    this.save('userCollections', data)
  }

  /** 只本地化自己的收藏概览的看过的标签 */
  saveUserCollectionsTags = () => {
    const { userCollectionsTags } = this.state
    const data = {}
    Object.keys(userCollectionsTags).forEach(key => {
      if (key.includes(`${userStore.myUserId}|`)) {
        data[key] = userCollectionsTags[key]
      }
    })
    this.save('userCollectionsTags', data)
  }

  /** 获取指定条目收藏信息 */
  fetchCollection = (subjectId: SubjectId): Promise<ResponseApi<Collection>> => {
    return this.fetch(
      {
        url: API_COLLECTION(subjectId),
        info: '条目收藏信息'
      },
      ['collection', subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )
  }

  /** 用户收藏概览 */
  fetchUserCollections = async (
    {
      userId = userStore.myUserId,
      subjectType = DEFAULT_SUBJECT_TYPE,
      type = DEFAULT_COLLECTION_STATUS,
      order = DEFAULT_ORDER,
      tag = ''
    }: FetchUserCollectionsArgs = {},
    refreshOrPage?: boolean | number,
    maxPage?: number
  ) => {
    const STATE_KEY = 'userCollections'
    const ITEM_ARGS = [userId, subjectType, type] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const data = this[STATE_KEY](...ITEM_ARGS)
      const { list, pagination } = data

      let page: number
      let refresh: boolean
      if (typeof refreshOrPage === 'boolean') {
        refresh = refreshOrPage
        page = refresh ? 1 : pagination.page + 1
      } else {
        refresh = true
        page = refreshOrPage
      }

      // 没有更多不再请求
      if (
        !refresh &&
        (pagination.page >= pagination.pageTotal || (maxPage && pagination.page >= maxPage))
      ) {
        return data
      }

      const html = await fetchHTML({
        url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, page)
      })
      const next = cheerioUserCollections(html)

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next.list : [...list, ...next.list],
            pagination: {
              page,
              pageTotal: Math.max(next.pagination.pageTotal, page)
            },
            _loaded: getTimestamp()
          }
        }
      })

      // 只本地化自己的收藏
      if (WEB || userId === userStore.userInfo.username || userId === userStore.myUserId) {
        this.saveUserCollections()
      }

      if (refreshOrPage === true || refreshOrPage === 1) {
        const tags = cheerioUserCollectionsTags(html)
        if (tags?.length) {
          const STATE_KEY_TAGS = 'userCollectionsTags'
          this.setState({
            [STATE_KEY_TAGS]: {
              [ITEM_KEY]: tags
            }
          })

          if (userId === userStore.myUserId) this.saveUserCollectionsTags()
        }
      }
    } catch (error) {
      this.error('fetchUserCollections', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** @deprecated 排队获取自己的所有动画收藏列表记录 (每种最多取 10 页 240 条数据) */
  fetchUserCollectionsQueue = async (
    refresh?: boolean,
    typeCn: SubjectTypeCn = '动画',
    showLoading?: boolean
  ) => {
    try {
      if (!userStore.isWebLogin) return false

      const { username } = userStore.usersInfo(userStore.myUserId)
      const userId = username || userStore.myUserId
      if (!userId) return false

      const subjectType = MODEL_SUBJECT_TYPE.getLabel<SubjectTypeValue>(typeCn) as SubjectType
      const now = getTimestamp()
      for (const item of COLLECTION_STATUS) {
        const { _loaded } = this.userCollections(userId, subjectType, item.value)
        if (refresh || !_loaded || now - Number(_loaded) > H) {
          if (showLoading) info(`[${item.value}] 用户收藏`)
          await this.fetchUserCollections(
            {
              userId,
              subjectType,
              type: item.value
            },
            true
          )
          await sleep()
        }
      }

      const data: UserCollectionStatus = {}
      for (const item of COLLECTION_STATUS) {
        const data = this.userCollections(userId, subjectType, item.value)
        const { pagination } = data
        const { page, pageTotal } = pagination

        // 列表未到底就一直请求, 最多请求到10页
        if (page < pageTotal && page < 10) {
          for (let i = page - 1; i < pageTotal; i += 1) {
            if (showLoading) info(`[${item.value}]: 页码${i + 1}`)
            await this.fetchUserCollections(
              {
                userId,
                subjectType,
                type: item.value
              },
              false
            )
            await sleep()
          }
        }

        this.userCollections(userId, subjectType, item.value).list.forEach(i => {
          if (typeCn === '游戏') {
            data[i.id] = item.label.replace('看', '玩') as CollectionStatusCn
          } else if (typeCn === '音乐') {
            data[i.id] = item.label.replace('看', '听') as CollectionStatusCn
          } else {
            data[i.id] = item.label
          }
        })
      }

      this.setState({
        userCollectionsMap: data,
        collectionStatus: data
      })
      this.save('userCollectionsMap')
      this.save('collectionStatus')
      return true
    } catch (error) {
      return false
    }
  }

  /** 瓷砖进度数据 */
  fetchMosaicTile = async (args: { userId?: UserId }) => {
    const { userId } = args || {}
    const key = 'mosaicTile'
    const _username = userId || userStore.myId
    if (
      this.mosaicTile._loaded &&
      getTimestamp() - this.mosaicTile._loaded <= 60 &&
      _username === this.mosaicTile._username
    ) {
      return this[key]
    }

    try {
      await xhrCustom({
        url: API_MOSAIC_TILE(_username).replace('/timelines/progress.json', '')
      })
      await sleep(2400)

      const { _response } = await xhrCustom({
        url: `${API_MOSAIC_TILE(_username)}?begin=2019-07-01&end=2020-12-31&state=${getTimestamp()}`
      })

      const data = JSON.parse(_response)
      if (!Object.keys(data || {}).length) {
        info('时间瓷砖数据生成中，请稍等一下再试')
        return false
      }

      data._username = _username
      data._loaded = getTimestamp()

      this.clearState(key, data)
      this.save(key)
    } catch (error) {
      info('时间瓷砖数据生成中，请稍等一下再试')
    }
    return this[key]
  }

  /**
   * 全局管理单独条目的收藏状态
   *  - [1] 需要登录
   *  - [2] subjectIds 长度 = 1 时, 都会请求
   *  - [3] subjectIds 长度 > 1 时, 当前有记录为 [看过 | 搁置 | 抛弃] 时不重新请求
   *  - [4] 批量请求时, 若条件通过, 条目重请求依然有 12 小时的间隔
   *  - [5] 允许提前终止
   * */
  fetchCollectionStatusQueue = async (
    subjectIds: SubjectId[] = [],

    /** 可用于提前终止批量请求 */
    shouldContinue: () => boolean = () => true
  ) => {
    const STATE_KEY_COLLECTION_STATUS = 'collectionStatus'
    const STATE_KEY_LAST_FETCH_MS = '_collectionStatusLastFetchMS'
    const userCollectionStatus: UserCollectionStatus = {}

    try {
      // 初始化状态
      await this.init(STATE_KEY_COLLECTION_STATUS)
      await this.init(STATE_KEY_LAST_FETCH_MS)

      const isWeb = WEB && !userStore.accessToken.access_token
      const isMobile = !WEB && !userStore.isLogin

      // [1] 未登录或者 subjectIds 为空, 直接返回
      if (isWeb || isMobile || !subjectIds.length) {
        return userCollectionStatus
      }

      const now = getTimestamp()
      const lastFetchMS: CollectionStatusLastFetchMS = {}
      const results: UserCollectionItem[] = []

      const fetchs: Fn[] = []
      const logSubjectIds: SubjectId[] = []
      let logged = false

      subjectIds.forEach(subjectId => {
        // [5]
        if (!shouldContinue()) {
          if (!logged) {
            this.warn('fetchCollectionStatusQueue', 'cancel')
            logged = true
          }
          return
        }

        if (
          // [2]
          subjectIds.length === 1 ||
          // [3]
          (!['看过', '搁置', '抛弃'].includes(this.collect(subjectId)) &&
            // [4]
            now - this._collectionStatusLastFetchMS(subjectId) >= H12)
        ) {
          fetchs.push(async () => {
            // [5]
            if (!shouldContinue()) {
              if (!logged) {
                this.warn('fetchCollectionStatusQueue', 'cancel')
                logged = true
              }
              return
            }

            const collection = await fetchCollectionSingleV0({
              subjectId,
              userId: userStore.myId
            })
            if (collection) results.push(collection)
            lastFetchMS[subjectId] = getTimestamp()
          })
          logSubjectIds.push(subjectId)
        }
      })

      if (logSubjectIds.length) this.log('fetchCollectionStatusQueue', logSubjectIds)
      await queue(fetchs, 2)

      results.forEach(result => {
        if (result?.subject_id && result?.type) {
          userCollectionStatus[result.subject_id] =
            MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(result.type)
        }
      })

      this.setState({
        [STATE_KEY_COLLECTION_STATUS]: userCollectionStatus,
        [STATE_KEY_LAST_FETCH_MS]: lastFetchMS
      })
      this.save(STATE_KEY_COLLECTION_STATUS)
      this.save(STATE_KEY_LAST_FETCH_MS)
    } catch (error) {
      this.error('fetchCollectionStatusQueue', error)
    }

    return userCollectionStatus
  }

  /** v0 api: 获取对应用户的收藏 */
  fetchUsersCollection = async (username: UserId, subjectId: SubjectId) => {
    try {
      const data: any = await request(API_USERS_SUBJECT_COLLECTION(username, subjectId))
      if (data?.updated_at) {
        const key = 'usersSubjectCollection'
        const stateKey = `${username}|${subjectId}`
        const item = {
          rate: data?.rate || 0,
          comment: data?.comment || '',
          type: String(data?.type || ''),
          update_at: data?.updated_at || '',
          _loaded: getTimestamp()
        }
        this.setState({
          [key]: {
            [stateKey]: item
          }
        })
        this.save(key)
        return item
      }

      return false
    } catch (error) {
      return false
    }
  }
}
