/*
 * 时间胶囊
 * @Author: czy0729
 * @Date: 2019-04-12 23:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 11:12:30
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'
import userStore from '../user'
import { NAMESPACE, DEFAULT_SCOPE, DEFAULT_TYPE } from './init'
import { fetchTimeline } from './common'

class Timeline extends store {
  state = observable({
    // 自己的时间胶囊
    timeline: {
      // [`${scope}|${type}`]: LIST_EMPTY
    },

    // 其他人的时间胶囊
    usersTimeline: {
      // [userId]: LIST_EMPTY
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('timeline', NAMESPACE)])
    const state = await res
    this.setState({
      timeline: state[0] || {}
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 自己的时间胶囊
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  timeline(scope = DEFAULT_SCOPE, type = DEFAULT_TYPE) {
    return computed(
      () => this.state.timeline[`${scope}|${type}`] || LIST_EMPTY
    ).get()
  }

  /**
   * 其他人的时间胶囊
   * @param {*} userId
   */
  usersTimeline(userId = userStore.myUserId) {
    return computed(() => this.state.usersTimeline[userId] || LIST_EMPTY).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取自己的时间胶囊
   * @todo 10个种类, 每个种类都有差别, 甚至出现分不清种类的情况, 影响较大时再优化
   */
  async fetchTimeline(
    { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE } = {},
    refresh
  ) {
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
  async fetchUsersTimeline({ userId = userStore.myUserId } = {}, refresh) {
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

  // -------------------- action --------------------
}

export default new Timeline()
