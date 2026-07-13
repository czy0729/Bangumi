/*
 * @Author: czy0729
 * @Date: 2023-04-24 03:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 07:30:21
 */
import { getTimestamp, info, queue, sleep } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { fetchCollectionSingleV0, request } from '@utils/fetch.v0'
import { heatmap } from '@utils/kv'
import {
  API_COLLECTION,
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
  CollectionStatus,
  CollectionStatusCn,
  CollectionsOrder,
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
  MosaicTile,
  UserCollectionStatus
} from './types'

export default class Fetch extends Computed {
  /** 只本地化自己的收藏概览 */
  saveUserCollections = (forMilestone: boolean = false) => {
    const STATE_KEY = forMilestone ? 'userCollectionsForMilestone' : 'userCollections'
    const data = this.state[STATE_KEY]
    const temp = {}

    Object.keys(data).forEach(key => {
      if (
        key.startsWith(`${userStore.userInfo.username}|`) ||
        key.startsWith(`${userStore.myUserId}|`)
      ) {
        temp[key] = data[key]
      }
    })
    this.save(STATE_KEY, temp)
  }

  /** 只本地化自己的收藏概览的看过的标签 */
  saveUserCollectionsTags = (forMilestone: boolean = false) => {
    const STATE_KEY = forMilestone ? 'userCollectionsTagsForMilestone' : 'userCollectionsTags'
    const data = this.state[STATE_KEY]
    const temp = {}

    Object.keys(data).forEach(key => {
      if (
        key.startsWith(`${userStore.userInfo.username}|`) ||
        key.startsWith(`${userStore.myUserId}|`)
      ) {
        temp[key] = data[key]
      }
    })
    this.save(STATE_KEY, temp)
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

  /** 倒序刷新：获取第一页确定 pageTotal，返回 pageTotal 和 page1 数据供复用 */
  private fetchReverseFirstPage = async (
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus,
    order: CollectionsOrder,
    tag: string
  ) => {
    const firstHtml = await fetchHTML({
      url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, 1)
    })
    if (!firstHtml) return { earlyReturn: true, pageTotal: 0, firstPage: null } as const

    const firstPage = cheerioUserCollections(firstHtml)
    const pageTotal = firstPage.pagination.pageTotal
    return { earlyReturn: false, pageTotal, firstPage } as const
  }

  /** 用户收藏概览 */
  fetchUserCollections = async (
    {
      userId = userStore.myUserId,
      subjectType = DEFAULT_SUBJECT_TYPE,
      type = DEFAULT_COLLECTION_STATUS,
      order = DEFAULT_ORDER,
      tag = '',
      forMilestone = false,
      reverse = false
    }: FetchUserCollectionsArgs = {},
    refreshOrPage?: boolean | number,
    maxPage?: number
  ) => {
    const STATE_KEY = forMilestone ? 'userCollectionsForMilestone' : 'userCollections'
    const ITEM_ARGS = [userId, subjectType, type] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const data = this[STATE_KEY](...ITEM_ARGS)
      const { list, pagination } = data

      let page: number
      let refresh: boolean
      let firstPage: ReturnType<typeof cheerioUserCollections> | null = null
      if (typeof refreshOrPage === 'boolean') {
        refresh = refreshOrPage
        if (reverse) {
          if (refresh) {
            // 倒序刷新：先获取第一页获取 pageTotal，然后从最后一页开始
            const result = await this.fetchReverseFirstPage(userId, subjectType, type, order, tag)
            if (result.earlyReturn) return this[STATE_KEY](...ITEM_ARGS)

            // pageTotal 为 0 说明请求失败
            if (!result.pageTotal) return data

            firstPage = result.firstPage
            // 多页，从最后一页开始
            page = result.pageTotal
          } else {
            // 倒序加载更多：获取前一页（page是API页码，从pageTotal递减）
            page = pagination.pageTotal - pagination.page
          }
        } else {
          page = refresh ? 1 : pagination.page + 1
        }
      } else {
        refresh = true
        page = refreshOrPage
      }

      // 没有更多不再请求（正序/倒序 displayPage 都从 1 递增到 pageTotal）
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

      // 倒序时，每页数据需要反转（API返回的是正序，倒序需要最新在前）
      const pageList = reverse ? [...next.list].reverse() : next.list

      // 新数据追加到列表后面
      let newList = refresh ? pageList : [...list, ...pageList]

      // 计算pagination：倒序时page从1开始递增（表示已加载页数）
      let displayPage: number
      if (reverse) {
        if (refresh) {
          // 倒序刷新：已加载1页（可能多页如果最后一页不满）
          displayPage = Math.ceil(newList.length / 24)
        } else {
          // 倒序加载更多：page递增
          displayPage = pagination.page + 1
        }
      } else {
        displayPage = page
      }

      const currentPagination = {
        page: displayPage,
        pageTotal: Math.max(
          next.pagination.pageTotal,
          pagination.pageTotal || next.pagination.pageTotal
        )
      }

      // 倒序刷新时，如果最后一页不满，继续往前获取多页
      if (reverse && refresh && next.list.length < 24 && page > 1) {
        let fetchPage = page - 1
        let extraPagesLoaded = 1 // 主 fetch 已加载1页，从此开始计数
        while (fetchPage >= 1) {
          let extraPage: ReturnType<typeof cheerioUserCollections>

          // 复用 fetchReverseFirstPage 已获取的 page1 数据，避免重复请求
          if (fetchPage === 1 && firstPage) {
            extraPage = firstPage
          } else {
            const extraHtml = await fetchHTML({
              url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, fetchPage)
            })
            if (!extraHtml) break
            extraPage = cheerioUserCollections(extraHtml)
          }

          if (!extraPage.list.length) break

          // 反转每页数据，追加到列表后面
          const reversedList = [...extraPage.list].reverse()
          newList = [...newList, ...reversedList]
          extraPagesLoaded += 1

          // 如果已获取足够数据或到达第一页，停止
          if (extraPage.list.length === 24 || fetchPage <= 1) break
          fetchPage -= 1
        }
        // 更新显示页码（已加载的总页数）
        currentPagination.page = extraPagesLoaded
      }

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: newList,
            pagination: currentPagination,
            _loaded: getTimestamp()
          }
        }
      })

      // 只本地化自己的收藏
      if (WEB || userId === userStore.userInfo.username || userId === userStore.myUserId) {
        this.saveUserCollections(forMilestone)
      }

      if (refreshOrPage === true || refreshOrPage === 1) {
        const tags = cheerioUserCollectionsTags(html)
        if (tags?.length) {
          const STATE_KEY_TAGS = forMilestone
            ? 'userCollectionsTagsForMilestone'
            : 'userCollectionsTags'
          this.setState({
            [STATE_KEY_TAGS]: {
              [ITEM_KEY]: tags
            }
          })
          if (userId === userStore.myUserId) this.saveUserCollectionsTags(forMilestone)
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
  fetchMosaicTile = async (userId: UserId = userStore.myId) => {
    const STATE_KEY = 'mosaicTile'
    const username = userId || userStore.myId

    try {
      const result = await heatmap(username)
      if (result) {
        const data: MosaicTile = {}
        result.forEach(item => {
          data[item.date] = item.count
        })

        this.setState({
          [STATE_KEY]: data
        })
        this.save(STATE_KEY)
      }
    } catch (error) {
      this.error('fetchMosaicTile', error)
    }

    return this[STATE_KEY]
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

            const collection = await fetchCollectionSingleV0(userStore.myId, subjectId)
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
      const data: any = await request(API_USERS_SUBJECT_COLLECTION(username, subjectId), null, {
        auth: false
      })
      if (data?.updated_at) {
        const STATE_KEY = 'usersSubjectCollection'
        const ITEM_KEY = `${username}|${subjectId}` as const

        const item = {
          rate: data?.rate || 0,
          comment: data?.comment || '',
          type: String(data?.type || ''),
          update_at: data?.updated_at || '',
          _loaded: getTimestamp()
        }
        this.setState({
          [STATE_KEY]: {
            [ITEM_KEY]: item
          }
        })
        this.save(STATE_KEY)
        return item
      }
    } catch {}

    return false
  }
}
