/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:29:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:37:18
 */
import { HOST, HTML_SAY, MODEL_TIMELINE_SCOPE } from '@constants'
import { Id, TimeLineScope, TimeLineType, UserId } from '@types'
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import userStore from '../user'
import Computed from './computed'
import { analysisFormHash, analysisSay, fetchTimeline } from './common'
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
    const timeline = this.timeline(scope, type)
    const data = await fetchTimeline(
      {
        scope,
        type,
        userId: userId || userStore.myId || userStore.myUserId
      },
      refresh,
      timeline,
      userStore.userInfo
    )

    const key = 'timeline'
    const stateKey = `${scope}|${type}`
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    return data
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
    const data = await fetchTimeline(
      { scope, type, userId },
      refresh,
      this.usersTimeline(userId),
      userStore.usersInfo(userId)
    )

    const key = 'usersTimeline'
    const stateKey = userId
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    return data
  }

  /** 吐槽 */
  fetchSay = async (args: { userId?: UserId; id: Id }) => {
    const { userId = 0, id = 0 } = args || {}
    const html = await fetchHTML({
      url: HTML_SAY(userId, id)
    })

    const data = {
      list: analysisSay(html),
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

    const formhash = analysisFormHash(html)
    this.setState({
      formhash
    })

    return formhash
  }
}
