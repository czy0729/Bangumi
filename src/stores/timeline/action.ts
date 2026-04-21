/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:37:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 00:56:04
 */
import { getTimestamp } from '@utils'
import { xhr } from '@utils/fetch'
import {
  API_CONNECT,
  API_TOPIC_COMMENT_LIKE,
  HTML_ACTION_TIMELINE_REPLY,
  HTML_ACTION_TIMELINE_SAY
} from '@constants'
import Fetch from './fetch'
import { parseRelativeTimeToTs } from './utils'

import type { Fn, Id, TimeLineScope, TimeLineType, UserId } from '@types'
export default class Action extends Fetch {
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

  /** 用于删除时间线后, 不进行请求直接更新本地数据 */
  removeTimeline = (clearHref: string, scope: TimeLineScope, type: TimeLineType) => {
    const data = this.timeline(scope, type)
    const key = 'timeline'
    const stateKey = `${scope}|${type}`
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: data.list.filter(item => item.clearHref !== clearHref)
        }
      }
    })
  }

  /** 同 removeTimeline (他人视角) */
  removeUsersTimeline = (clearHref: string, userId: UserId) => {
    const data = this.usersTimeline(userId)
    const key = 'usersTimeline'
    const stateKey = userId
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: data.list.filter(item => item.clearHref !== clearHref)
        }
      }
    })
  }

  /** 从最新的时间线数据更新好友的最近活跃时间 */
  syncActiveFromTimeline = async (scope: TimeLineScope, type: TimeLineType) => {
    const STATE_KEY = 'active'
    await this.init(STATE_KEY)

    const { list } = this.timeline(scope, type)
    const updates: Record<UserId, number> = {}
    const prevActive = this[STATE_KEY]

    try {
      list.forEach(item => {
        const userUrl = item?.p1?.url
        if (!userUrl) return

        const userId = userUrl.split('/').pop()
        if (!userId) return

        const newTs = parseRelativeTimeToTs(item.time)
        if (!newTs) return

        const prev = prevActive[userId] || 0

        // 没有旧值，或者新时间更近
        if (!prev || newTs > prev) updates[userId] = newTs
      })

      if (Object.keys(updates)?.length) {
        this.setState({
          [STATE_KEY]: updates
        })
        this.save(STATE_KEY)
      }
    } catch (error) {
      this.error('syncActiveFromTimeline', error)
    }

    return updates
  }

  updateActive = async (updates: Record<UserId, number>) => {
    const STATE_KEY = 'active'
    await this.init(STATE_KEY)

    this.setState({
      [STATE_KEY]: updates
    })
  }

  // -------------------- action --------------------
  /** 回复吐槽 */
  doReply = async (
    args: {
      id: Id
      content: string
      formhash: string
    },
    success?: (responseText?: string) => any
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
    success?: (responseText?: string) => any
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

  private _doLiking = false

  /** 添加回复表情 */
  doLike = (
    item: {
      main_id: number
      type: number
      value: string
    },
    id: number,
    formhash: string,
    callback?: Fn,
    userInfo?: {
      username: string
      nickname: string
    }
  ) => {
    if (this._doLiking) return

    this._doLiking = true
    setTimeout(() => {
      this._doLiking = false
    }, 1600)

    let isOptimisticUpdated = false

    // 使用 try-catch 包裹乐观更新，防止其致命错误阻塞 API 请求
    try {
      if (userInfo?.username && userInfo?.nickname) {
        const idKey = String(id)
        const targetValue = String(item.value)

        const rawData = this.likes(idKey) || {}

        // 如果 rawData 已经包含 idKey，就取里面的，否则取它自己
        const currentReactions = JSON.parse(JSON.stringify(rawData[idKey] || rawData))

        // 查找当前是否已经有选中的 value (互斥逻辑)
        let prevSelectedValue = null
        for (const val in currentReactions) {
          if (val === idKey) continue

          if (currentReactions[val] && currentReactions[val].selected === true) {
            prevSelectedValue = String(val)
            break
          }
        }

        if (prevSelectedValue === targetValue) {
          // 取消逻辑
          const reaction = currentReactions[targetValue]
          reaction.total = Math.max(0, (Number(reaction.total) || 1) - 1)
          reaction.selected = false
          reaction.users = (reaction.users || []).filter(
            (u: any) => u.username !== userInfo.username
          )

          if (reaction.total === 0) {
            delete currentReactions[targetValue]
          }
        } else {
          // 切换/新增逻辑
          // 清理旧的
          if (prevSelectedValue && currentReactions[prevSelectedValue]) {
            const prevReaction = currentReactions[prevSelectedValue]
            prevReaction.total = Math.max(0, (Number(prevReaction.total) || 1) - 1)
            prevReaction.selected = false
            prevReaction.users = (prevReaction.users || []).filter(
              (u: any) => u.username !== userInfo.username
            )
            if (prevReaction.total === 0) delete currentReactions[prevSelectedValue]
          }

          // 增加新的
          if (!currentReactions[targetValue]) {
            currentReactions[targetValue] = {
              type: item.type,
              main_id: String(item.main_id),
              value: targetValue,
              total: 1,
              users: [
                {
                  username: userInfo.username,
                  nickname: userInfo.nickname
                }
              ],
              selected: true
            }
          } else {
            const targetReaction = currentReactions[targetValue]
            targetReaction.total = (Number(targetReaction.total) || 0) + 1
            targetReaction.selected = true
            if (!targetReaction.users) targetReaction.users = []
            targetReaction.users.push({
              username: userInfo.username,
              nickname: userInfo.nickname
            })
          }
        }

        this.updateLikes({
          [idKey]: currentReactions
        })
        isOptimisticUpdated = true
      }
    } catch (e) {
      // 发生致命错误，重置标识位，确保下面的 xhr 正常更新数据
      isOptimisticUpdated = false
    }

    xhr(
      {
        url: API_TOPIC_COMMENT_LIKE(item.type, item.main_id, id, item.value, formhash)
      },
      responseText => {
        try {
          const data = JSON.parse(responseText)
          if (data?.status === 'ok') {
            // 如果没走乐观更新，或者发生了错误，走原有的更新逻辑
            if (!isOptimisticUpdated) {
              this.updateLikes(
                data?.data || {
                  [id]: {}
                }
              )
            }
            if (typeof callback === 'function') callback()
          }
        } catch {}
      },
      () => {
        if (typeof callback === 'function') callback()
      }
    )
  }

  /** 添加好友 */
  doConnect = async (userId: number) => {
    await this.fetchFormHash()
    if (!this.formhash) return false

    return new Promise(resolve => {
      xhr(
        {
          url: API_CONNECT(userId, this.formhash)
        },
        responseText => {
          try {
            if (JSON.parse(responseText)?.status === 'ok') return resolve(true)
          } catch {}

          resolve(false)
        },
        () => resolve(false)
      )
    })
  }
}
