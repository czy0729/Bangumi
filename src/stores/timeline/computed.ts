/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:29:27
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { Id, StoreConstructor, TimeLineScope, TimeLineType, UserId } from '@types'
import userStore from '../user'
import State from './state'
import { DEFAULT_SCOPE, DEFAULT_TYPE, STATE } from './init'
import { Hidden, Say, Timeline } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 时间胶囊 */
  timeline(scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) {
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
}
