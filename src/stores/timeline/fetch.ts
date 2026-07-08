/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:29:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-09 06:19:13
 */
import { getTimestamp, queue } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { fetchUserActive } from '@utils/fetch.p1'
import { fetchCollectionV0, fetchUsersV0 } from '@utils/fetch.v0'
import { H1, HOST, HTML_SAY, HTML_TIMELINE, LIST_EMPTY, MODEL_TIMELINE_SCOPE } from '@constants'
import systemStore from '../system'
import userStore from '../user'
import { cheerioFormHash, cheerioSay, cheerioTimeline } from './common'
import Computed from './computed'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from './init'

import type { Id, SubjectId, TimeLineScope, TimeLineScopeCn, UserId } from '@types'
import type {
  CollectionTimelines,
  FetchTimelineArgs,
  FetchTimelineHTMLReturn,
  FetchUsersCollectionsTimelineArgs,
  FetchUsersTimelineArgs,
  Timeline
} from './types'

export default class Fetch extends Computed {
  /** 获取自己视角的时间胶囊 */
  fetchTimeline = async (args: FetchTimelineArgs, refresh?: boolean) => {
    const { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE, userId } = args || {}
    const STATE_KEY = 'timeline'
    const ITEM_ARGS = [scope, type] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const data = this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
      const { likes, ...next } = await this.fetchTimelineHTML(
        {
          scope,
          type,
          userId: userId || userStore.myId || userStore.myUserId
        },
        refresh,
        data,
        userStore.userInfo
      )
      this.updateLikes(likes)

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: next
        }
      })
    } catch (error) {
      this.error('fetchTimeline', error)
    }

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  }

  /**
   * 请求并解析时间胶囊 HTML
   * (私有, 供 fetchTimeline / fetchUsersTimeline / fetchUsersCollectionsTimeline 复用)
   * */
  private fetchTimelineHTML = async (
    args: FetchTimelineArgs = {},
    refresh?: boolean,
    prevTimeline?: Timeline,
    userInfo?: any
  ): Promise<FetchTimelineHTMLReturn> => {
    const { scope, type, userId } = args || {}
    const oldData = prevTimeline || LIST_EMPTY
    const page = refresh ? 1 : oldData?.pagination.page + 1
    const scopeCn = MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>(scope)

    const html = await fetchHTML({
      url: HTML_TIMELINE(scope, type, userInfo?.username || userId, page)
    })
    const { list, pagination, likes } = cheerioTimeline(html, { page, scopeCn })
    return {
      list: page === 1 ? list : [...oldData.list, ...list],
      pagination,
      likes,
      _loaded: getTimestamp()
    }
  }

  /** 获取他人视角的时间胶囊 */
  fetchUsersTimeline = async (args: FetchUsersTimelineArgs, refresh?: boolean) => {
    let { userId, type } = args || {}

    // ID 若改过必须要用改过后的
    if (!userId) userId = userStore.myId
    if (!type) type = DEFAULT_TYPE

    // 范围是自己返回的是某个人的请求地址
    const scope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己')
    const { likes, ...next } = await this.fetchTimelineHTML(
      { scope, type, userId },
      refresh,
      this.usersTimeline(userId),
      userStore.usersInfo(userId)
    )
    this.updateLikes(likes)

    const key = 'usersTimeline'
    const stateKey = userId
    this.setState({
      [key]: {
        [stateKey]: {
          ...next,
          _loaded: getTimestamp()
        }
      }
    })

    return next
  }

  /** 获取条目评论关联贴贴 */
  fetchUsersCollectionsTimeline = async (args: FetchUsersCollectionsTimelineArgs, page: number) => {
    const { userId = userStore.myUserId } = args || {}

    // 范围是自己返回的是某个人的请求地址
    const scope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己')
    const { likes, ...next } = await this.fetchTimelineHTML(
      { scope, type: 'subject', userId },
      page === 1,
      {
        list: [],
        pagination: {
          page: page - 1,
          pageTotal: 100
        }
      }
    )
    this.updateLikes(likes)

    const data: Record<SubjectId, Id> = {}
    next.list.forEach(item => {
      const relatedId = item?.like?.relatedId || 0
      if (relatedId) {
        const url = String(item?.p3?.url?.[0] || '')
        if (url && url.includes('/subject/')) {
          const subjectId = url.split('/subject/')?.[1] || 0
          if (subjectId) {
            data[subjectId] = relatedId
          }
        }
      }
    })

    const key = 'collectionsTimeline'
    this.setState({
      [key]: {
        [userId]: {
          ...this[key](userId),
          ...data,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    this.log(
      'fetchUsersCollectionsTimeline',
      {
        userId,
        page
      },
      data
    )

    return data
  }

  /** 吐槽 */
  fetchSay = async (args: { userId?: UserId; id: Id }) => {
    const { userId = 0, id = 0 } = args || {}
    const html = await fetchHTML({
      url: HTML_SAY(userId, id)
    })

    const data = {
      list: cheerioSay(html),
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    }

    const key = 'say'
    const sayId = String(id).split('#')[0]
    this.setState({
      [key]: {
        [sayId]: data
      }
    })
    this.save(key)

    return data
  }

  /** 吐槽表单授权码 (https://bgm.tv/timeline?type=say) */
  fetchFormHash = async () => {
    const html = await fetchHTML({
      url: `${HOST}/timeline?type=say`
    })

    const formhash = cheerioFormHash(html)
    this.setState({
      formhash
    })

    return formhash
  }

  /** 按需获取条目评论关联贴贴 */
  fetchUsersCollectionsTimelineQueue = async (userId: UserId) => {
    if (!userId) return false

    await this.init('collectionsTimeline')
    const { _loaded } = this.collectionsTimeline(userId)

    const current = getTimestamp()
    const needRefresh = current - Number(_loaded || 0) > 60 * 60
    if (!needRefresh) return true

    // 非付费用户仅获取一页
    if (!systemStore.advance) {
      return this.fetchUsersCollectionsTimeline(
        {
          userId
        },
        1
      )
    }

    const fetchs = [
      () =>
        this.fetchUsersCollectionsTimeline(
          {
            userId
          },
          1
        )
    ]
    const needDeepRefresh = current - Number(_loaded || 0) > 60 * 60 * 24 * 4
    if (needDeepRefresh) {
      for (let i = 2; i <= 6; i += 1) {
        fetchs.push(() =>
          this.fetchUsersCollectionsTimeline(
            {
              userId
            },
            i
          )
        )
      }
    }
    return queue(fetchs, 1)
  }

  /** 批量获取用户最后活跃时间 */
  fetchUsersActiveQueue = async (
    userIds: UserId[],
    onProgress?: (percent: string, updates?: Record<UserId, number>) => void
  ) => {
    const STATE_KEY = 'active'
    await this.init(STATE_KEY)

    const updates: Record<UserId, number> = {}
    const prevActive = this[STATE_KEY]
    const now = getTimestamp()

    try {
      const fetchs = userIds.map((userId, index) => async () => {
        const prev = prevActive[userId] || 0
        if (prev && now - prev <= H1) return

        updates[userId] = await fetchUserActive(userId)

        if (typeof onProgress === 'function') {
          onProgress(`${Math.floor(((index + 1) / (userIds.length || 1)) * 100)}%`, updates)
        }
      })
      await queue(fetchs, 2)

      this.setState({
        [STATE_KEY]: updates
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchUsersActiveQueue', error)
    }

    return updates
  }

  /** 获取用户的追踪收藏时间线 */
  fetchCollectionTimelines = async (userId: UserId, refresh: boolean = false) => {
    const STATE_KEY = 'collectionTimelines'
    const ITEM_KEY = userId

    try {
      const data: CollectionTimelines = {
        userId: 0,
        avatar: '',
        name: '',
        map: {},
        _loaded: 0
      }

      const users = await fetchUsersV0(userId, {
        auth: false
      })
      if (users?.username && users?.avatar && users?.nickname) {
        data.userId = users.username
        data.avatar = users.avatar.large
        data.name = users.nickname

        const promises = [
          fetchCollectionV0(data.userId, ['anime'], '3', {
            auth: false
          })
        ]
        this.log('fetchCollectionTimelines', {
          userId: data.userId,
          type: 'anime',
          status: '3'
        })

        // 如果 refresh 为 true，额外加入状态 '2' 的请求
        if (refresh) {
          promises.push(
            fetchCollectionV0(data.userId, ['anime'], '2', {
              auth: false
            })
          )
          this.log('fetchCollectionTimelines', {
            userId: data.userId,
            type: 'anime',
            status: '2'
          })
        }

        const results = await Promise.all(promises)

        // 提取并合并所有返回的 list
        const combinedList = []
        results.forEach(res => {
          if (res?.list) combinedList.push(...res.list)
        })

        if (combinedList.length) {
          combinedList.forEach(item => {
            data.map[item.subject_id] = {
              eps: item.ep_status,
              lasttouch: item.lasttouch
            }
          })
          data._loaded = getTimestamp()

          this.setState({
            [STATE_KEY]: {
              [ITEM_KEY]: data
            }
          })
          this.save(STATE_KEY)
          return true
        }
      }
    } catch (error) {
      this.error('fetchCollectionTimelines', error)
    }

    return false
  }
}
