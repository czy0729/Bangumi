/*
 * 时间胶囊
 * @Author: czy0729
 * @Date: 2019-04-12 23:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-09 23:07:13
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML, xhr } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'
import { HTML_SAY, HTML_ACTION_TIMELINE_REPLY } from '@constants/html'
import userStore from '../user'
import { NAMESPACE, DEFAULT_SCOPE, DEFAULT_TYPE } from './init'
import { fetchTimeline, analysisSay } from './common'

class Timeline extends store {
  state = observable({
    /**
     * 自己的时间胶囊
     */
    timeline: {
      // [`${scope}|${type}`]: LIST_EMPTY
    },

    /**
     * 其他人的时间胶囊
     */
    usersTimeline: {
      // [userId]: LIST_EMPTY
    },

    /**
     * 吐槽
     */
    say: {
      // [id]: LIST_EMPTY<INIT_SAY_ITEM>
    }
  })

  init = () => this.readStorage(['timeline', 'say'], NAMESPACE)

  // -------------------- get --------------------
  timeline(scope = DEFAULT_SCOPE, type = DEFAULT_TYPE) {
    return computed(
      () => this.state.timeline[`${scope}|${type}`] || LIST_EMPTY
    ).get()
  }

  usersTimeline(userId = userStore.myUserId) {
    return computed(() => this.state.usersTimeline[userId] || LIST_EMPTY).get()
  }

  say(id = 0) {
    return computed(() => this.state.say[id] || LIST_EMPTY).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取自己的时间胶囊
   * @todo 10个种类, 每个种类都有差别, 甚至出现分不清种类的情况, 影响较大时再优化
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  fetchTimeline = async (
    { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE } = {},
    refresh
  ) => {
    const timeline = this.timeline(scope, type)
    const res = fetchTimeline(
      { scope, type, userId: userStore.myUserId },
      refresh,
      timeline,
      userStore.userInfo
    )
    const data = await res

    // -------------------- 缓存 --------------------
    const key = 'timeline'
    const stateKey = `${scope}|${type}`
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
    return res
  }

  /**
   * 获取其他人的时间胶囊
   * @todo 10个种类, 每个种类都有差别, 甚至出现分不清种类的情况, 影响较大时再优化
   */
  fetchUsersTimeline = async (
    { userId = userStore.myUserId } = {},
    refresh
  ) => {
    // 范围是自己返回的是某个人的请求地址
    const scope = MODEL_TIMELINE_SCOPE.getValue('自己')
    const type = DEFAULT_TYPE
    const timeline = this.usersTimeline(userId)
    const res = fetchTimeline(
      { scope, type, userId },
      refresh,
      timeline,
      userStore.usersInfo(userId)
    )
    const data = await res

    // -------------------- 缓存 --------------------
    const key = 'usersTimeline'
    const stateKey = userId
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    return res
  }

  /**
   * 标签
   */
  fetchSay = async ({ userId = 0, id = 0 } = {}) => {
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
    this.setState({
      [key]: {
        [id]: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return data
  }

  // -------------------- action --------------------
  /**
   * 回复吐槽
   */
  doReply = async ({ id, content, formhash }, success) => {
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
}

export default new Timeline()
