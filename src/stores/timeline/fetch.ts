import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:29:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-03 01:12:44
 */
import { DEV, HOST, HTML_SAY, MODEL_TIMELINE_SCOPE } from '@constants'
import { Id, SubjectId, TimeLineScope, TimeLineType, UserId } from '@types'
import userStore from '../user'
import { cheerioFormHash, cheerioSay, fetchTimeline } from './common'
import Computed from './computed'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from './init'

export default class Fetch extends Computed {
  /** 获取自己视角的时间胶囊 */
  fetchTimeline = async (
    args: {
      scope?: TimeLineScope
      type?: TimeLineType
      userId?: UserId
    },
    refresh?: boolean
  ) => {
    const { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE, userId } = args || {}
    const data = this.timeline(scope, type)
    const { likes, ...next } = await fetchTimeline(
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

    const key = 'timeline'
    const stateKey = `${scope}|${type}`
    this.setState({
      [key]: {
        [stateKey]: next
      }
    })

    return next
  }

  /** 获取他人视角的时间胶囊 */
  fetchUsersTimeline = async (
    args: {
      userId?: UserId
      type?: TimeLineType
    },
    refresh?: boolean
  ) => {
    const { userId = userStore.myUserId, type = DEFAULT_TYPE } = args || {}

    // 范围是自己返回的是某个人的请求地址
    const scope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己')
    const { likes, ...next } = await fetchTimeline(
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
  fetchUsersCollectionsTimeline = async (
    args: {
      /** 需要改过后的 Id */
      userId?: UserId
    },
    page: number
  ) => {
    const { userId = userStore.myUserId } = args || {}

    // 范围是自己返回的是某个人的请求地址
    const scope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己')
    const { likes, ...next } = await fetchTimeline({ scope, type: 'subject', userId }, page === 1, {
      list: [],
      pagination: {
        page,
        pageTotal: 100
      }
    })
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

    if (DEV) {
      console.info(
        `timelineStore.fetch.fetchUsersCollectionsTimeline`,
        {
          userId,
          page
        },
        data
      )
    }

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
}
