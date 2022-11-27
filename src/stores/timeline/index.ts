/*
 * 时间胶囊
 * @Author: czy0729
 * @Date: 2019-04-12 23:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-27 16:54:40
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML, xhr } from '@utils/fetch'
import {
  DEV,
  HOST,
  HTML_ACTION_TIMELINE_REPLY,
  HTML_ACTION_TIMELINE_SAY,
  HTML_SAY,
  LIST_EMPTY,
  MODEL_TIMELINE_SCOPE
} from '@constants'
import { Id, StoreConstructor, TimeLineScope, TimeLineType, UserId } from '@types'
import userStore from '../user'
import { LOG_INIT } from '../ds'
import { NAMESPACE, DEFAULT_SCOPE, DEFAULT_TYPE } from './init'
import { fetchTimeline, analysisSay, analysisFormHash } from './common'
import { Hidden, Say, Timeline } from './types'

const state = {
  /** 时间胶囊 */
  timeline: {
    0: LIST_EMPTY
  },

  /** 其他人的时间胶囊 */
  usersTimeline: {
    0: LIST_EMPTY
  },

  /** 吐槽 */
  say: {
    0: LIST_EMPTY
  },

  /** 吐槽表单授权码 */
  formhash: '',

  /** 隐藏TA */
  hidden: {}
}

class TimelineStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  private _loaded = {
    timeline: false,
    say: false,
    hidden: false
  }

  init = (key: keyof typeof this._loaded) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('TimelineStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: keyof typeof this._loaded) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 时间胶囊 */
  timeline(scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) {
    this.init('timeline')
    return computed<Timeline>(() => {
      const key = `${scope}|${type}`
      return this.state.timeline[key] || LIST_EMPTY
    }).get()
  }

  /** 其他人的时间胶囊 */
  usersTimeline(userId?: UserId) {
    return computed<Timeline>(() => {
      const key = userId || userStore.myUserId
      return this.state.usersTimeline[key] || LIST_EMPTY
    }).get()
  }

  /** 吐槽 */
  say(id: Id) {
    this.init('say')
    return computed<Say>(() => {
      const sayId = String(id).split('#')[0]
      return this.state.say[sayId] || LIST_EMPTY
    }).get()
  }

  /** 吐槽表单授权码 */
  @computed get formhash() {
    return this.state.formhash
  }

  /** 隐藏 TA */
  @computed get hidden(): Hidden {
    this.init('hidden')
    return this.state.hidden
  }

  // -------------------- fetch --------------------
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

    if (scope === 'friend') this.save(key)
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
    const res = fetchTimeline(
      { scope, type, userId },
      refresh,
      this.usersTimeline(userId),
      userStore.usersInfo(userId)
    )

    const data = await res
    const key = 'usersTimeline'
    const stateKey = userId
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    return res
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

  // -------------------- methods --------------------
  /** 更新隐藏某人动态的截止时间 */
  updateHidden = (hash?: UserId, day: number = 1) => {
    if (!hash) return false

    const key = 'hidden'
    if (day) {
      this.setState({
        [key]: {
          ...this.state[key],
          [hash]: getTimestamp() + day * 24 * 60 * 60
        }
      })
    } else {
      this.clearState(key, {})
    }
    this.save(key)

    return true
  }

  // -------------------- action --------------------
  /** 回复吐槽 */
  doReply = async (
    args: {
      id: Id
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { id, content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_REPLY(id),
        data: {
          content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }

  /** 新吐槽 */
  doSay = async (
    args: {
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_SAY(),
        data: {
          say_input: content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }
}

export default new TimelineStore()
