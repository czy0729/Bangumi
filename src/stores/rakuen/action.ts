/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:31:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 17:52:14
 */
import { confirm, getTimestamp, info } from '@utils'
import { syncSystemStore, syncUserStore } from '@utils/async'
import { put, read } from '@utils/db'
import { fetchHTML, xhr } from '@utils/fetch'
import { collect, collectList, get, is, update } from '@utils/kv'
import {
  API_TOPIC_COMMENT_LIKE,
  APP_ADVANCE_TRACK_COMMENT,
  APP_FREE_TRACK_COMMENT,
  HOST,
  HTML_ACTION_BLOG_REPLY,
  HTML_ACTION_RAKUEN_REPLY,
  HTML_PRIVACY,
  HTML_TOPIC_EDIT
} from '@constants'
import Fetch from './fetch'

import type { RakuenReplyType } from '@constants/html/types'
import type {
  Fn,
  Id,
  RakuenAutoLoadImage,
  RakuenNewFloorStyle,
  RakuenScrollDirection,
  RakuenSubExpand,
  TopicId,
  TopicType,
  UserId
} from '@types'
import type { SettingKeys } from './types'

export default class Action extends Fetch {
  /** 清除电波提醒未读 */
  doClearNotify = async () => {
    const { clearHref } = this.notify
    if (clearHref) {
      await fetchHTML({
        url: `${HOST}${clearHref}`
      })

      const key = 'notify'
      this.setState({
        notify: {
          ...this.notify,
          unread: 0,
          clearHref: '',
          clearHTML: ''
        }
      })
      this.save(key)
    }
  }

  /** 回复帖子 | 回复帖子子回复 */
  doReply = async (
    args: {
      topicId: string | number
      type?: RakuenReplyType
      content?: string
      formhash?: string
      related?: any
      sub_reply_uid?: any
      post_uid?: any
    },
    success?: Fn
  ) => {
    const { topicId, type = 'group/topic', ...other } = args || {}
    xhr(
      {
        url: HTML_ACTION_RAKUEN_REPLY(topicId, type),
        data: {
          ...other,
          related_photo: 0,
          lastview: getTimestamp(),
          submit: 'submit'
        }
      },
      success
    )
  }

  /** 删除回复 */
  doDeleteReply = async (args: { url: string }, success?: () => any) => {
    const { url } = args || {}
    xhr(
      {
        url
      },
      success
    )
  }

  /** 编辑回复 */
  doEditReply = async (
    args: {
      postId: Id
      topicType: TopicType | 'blog'
      content: string
      formhash: string
    },
    success?: Fn,
    fail?: Fn
  ) => {
    const { postId, topicType, content, formhash } = args || {}
    xhr(
      {
        url: HTML_TOPIC_EDIT(postId, topicType),
        data: {
          content,
          formhash,
          submit: '改好了'
        }
      },
      success,
      fail
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
    floorId: number,
    formhash: string,
    topicId: TopicId,
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

    const STATE_KEY = 'likes'
    const ITEM_KEY = topicId
    let isOptimisticUpdated = false

    // 使用 try-catch 包裹乐观更新，防止其致命错误阻塞 API 请求
    try {
      if (userInfo?.username && userInfo?.nickname) {
        const fId = String(floorId)
        const targetValue = String(item.value)

        const topicLikes = JSON.parse(JSON.stringify(this[STATE_KEY](ITEM_KEY) || {}))

        // 获取当前楼层 (floorId) 的 reactions 列表
        const currentReactions = topicLikes[fId] || {}

        // 查找当前是否已经有选中的 value (互斥逻辑)
        let prevSelectedValue = null
        for (const val in currentReactions) {
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
          if (reaction.total === 0) delete currentReactions[targetValue]
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
              users: [{ username: userInfo.username, nickname: userInfo.nickname }],
              selected: true
            }
          } else {
            const targetReaction = currentReactions[targetValue]
            targetReaction.total = (Number(targetReaction.total) || 0) + 1
            targetReaction.selected = true
            if (!targetReaction.users) targetReaction.users = []
            targetReaction.users.push({ username: userInfo.username, nickname: userInfo.nickname })
          }
        }

        topicLikes[fId] = currentReactions
        this.setState({
          [STATE_KEY]: {
            [ITEM_KEY]: topicLikes
          }
        })
        isOptimisticUpdated = true
      }
    } catch (e) {
      isOptimisticUpdated = false
    }

    xhr(
      {
        url: API_TOPIC_COMMENT_LIKE(item.type, item.main_id, floorId, item.value, formhash)
      },
      responseText => {
        try {
          const data = JSON.parse(responseText)
          if (data?.status === 'ok') {
            // 如果没走乐观更新，或者发生了错误，走原有的更新逻辑
            if (!isOptimisticUpdated) {
              let state: any
              if (data?.data) {
                state = {
                  ...this[STATE_KEY](ITEM_KEY),
                  ...data.data
                }
              } else {
                state = {
                  ...this[STATE_KEY](ITEM_KEY),
                  [floorId]: {}
                }
              }

              this.setState({
                [STATE_KEY]: {
                  [ITEM_KEY]: state
                }
              })
              this.save(STATE_KEY)
            } else {
              // 虽然是乐观更新，但为了持久化，仍需 save
              this.save(STATE_KEY)
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

  /** 回复日志 */
  doReplyBlog = async (
    args: {
      blogId: TopicId
      content?: string
      formhash?: string
      related?: any
      sub_reply_uid?: any
      post_uid?: any
    },
    success?: (responseText?: string, request?: any) => any
  ) => {
    const { blogId, ...other } = args || {}
    xhr(
      {
        url: HTML_ACTION_BLOG_REPLY(blogId),
        data: {
          ...other,
          related_photo: 0,
          lastview: getTimestamp(),
          submit: 'submit'
        }
      },
      success
    )
  }

  /** 删除日志回复 */
  doDeleteReplyBlog = async (args: { url: string }, success?: Fn, fail?: Fn) => {
    const { url } = args || {}
    xhr(
      {
        url
      },
      success,
      fail
    )
  }

  /** 与某用户绝交 */
  doBlockUser = async (
    args: {
      keyword: string
    },
    success?: Fn,
    fail?: Fn
  ) => {
    if (!this.formhash) {
      if (typeof fail === 'function') fail()
      return false
    }

    const { keyword } = args || {}
    xhr(
      {
        method: 'POST',
        url: HTML_PRIVACY(),
        data: {
          ignore_user: keyword,
          formhash: this.formhash,
          submit_ignore: '保存'
        }
      },
      success,
      fail
    )
  }

  /** 取消与某用户绝交 */
  doCancelBlockUser = async (args: { url: string }, success?: Fn, fail?: Fn) => {
    const { url } = args || {}
    xhr(
      {
        url
      },
      success,
      fail
    )
  }

  // -------------------- page --------------------
  /**
   * 更新帖子历史查看信息
   * @param {*} topicId 帖子Id
   * @param {Int} replies 回复数
   */
  updateTopicReaded = (topicId: TopicId, replies: number = 0) => {
    const readed = this.readed(topicId)
    const key = 'readed'
    const time = getTimestamp()
    this.setState({
      [key]: {
        [topicId]: {
          replies,
          time,
          _time: readed.time === 0 ? time : readed.time
        }
      }
    })
    this.save(key)
  }

  /** 设置`自动加载楼层中的图片` */
  setAutoLoadImage = (value: RakuenAutoLoadImage) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        autoLoadImageV2: value
      }
    })
    this.save(key)
  }

  /** 设置`子楼层折叠` */
  setSubExpand = (subExpand: RakuenSubExpand) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        subExpand
      }
    })
    this.save(key)
  }

  /** 设置`新楼层样式` */
  setNewFloorStyle = (newFloorStyle: RakuenNewFloorStyle) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        newFloorStyle
      }
    })
    this.save(key)
  }

  /** 设置`楼层导航条方向` */
  setScrollDirection = (scrollDirection: RakuenScrollDirection) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        scrollDirection
      }
    })
    this.save(key)
  }

  /** 切换 */
  switchSetting = (switchKey: SettingKeys) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: !this.setting[switchKey]
      }
    })
    this.save(key)
  }

  /** 对指定设置直接赋值 */
  setSetting = (switchKey: SettingKeys, value: unknown = true) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: value
      }
    })
    this.save(key)
  }

  /** 添加屏蔽关键字 */
  addBlockKeyword = (keyword: string) => {
    const { blockKeywords } = this.setting
    if (blockKeywords.includes(keyword)) return

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockKeywords: [...blockKeywords, keyword]
      }
    })
    this.save(key)
  }

  /** 删除屏蔽关键字 */
  deleteBlockKeyword = (keyword: string) => {
    const { blockKeywords } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockKeywords: blockKeywords.filter(item => item !== keyword)
      }
    })
    this.save(key)
  }

  /** 添加屏蔽小组 */
  addBlockGroup = (group: string) => {
    const { blockGroups } = this.setting
    if (blockGroups.includes(group)) return

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockGroups: [...blockGroups, group]
      }
    })
    this.save(key)
  }

  /** 删除屏蔽小组 */
  deleteBlockGroup = (group: string) => {
    const { blockGroups } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockGroups: blockGroups.filter(item => item !== group)
      }
    })
    this.save(key)
  }

  /**
   * 添加屏蔽用户
   * @param {string} userNameSpace `${userName}@${userId}`
   */
  addBlockUser = async (userNameSpace: string) => {
    this.init('setting')

    const { blockUserIds } = this.setting
    if (blockUserIds.includes(userNameSpace)) return

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockUserIds: [...blockUserIds, userNameSpace]
      }
    })
    this.save(key)
  }

  /**
   * 删除屏蔽用户
   * @param {string} userNameSpace `${userName}@${userId}`
   */
  deleteBlockUser = (userNameSpace: string) => {
    const { blockUserIds } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockUserIds: blockUserIds.filter(item => item !== userNameSpace)
      }
    })
    this.save(key)
  }

  /** @deprecated 设置是否收藏*/
  setFavor = (topicId: TopicId, isFavor: boolean) => {
    const key = 'favor'
    this.setState({
      [key]: {
        [topicId]: isFavor
      }
    })
    this.save(key)
  }

  /** 获取收藏索引 */
  getFavor = async () => {
    await this.init('favorV2')

    const { myUserId } = syncUserStore()
    if (!myUserId) return null

    const result = await collectList(myUserId)
    if (result?.code === 200 && Array.isArray(result?.data)) {
      const data = {}
      result.data.forEach((item: { createTime: string; id: string }) => {
        data[item.id] = true
      })

      const key = 'favorV2'
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return result
  }

  /** 设置收藏 */
  setFavorV2 = async (topicId: TopicId | `blog/${Id}`, isFavor: boolean) => {
    await this.init('favorV2')
    await this.init('favorCount')

    const { myUserId } = syncUserStore()
    if (!myUserId) {
      info('请先登录')
      return null
    }

    const result = await collect(myUserId, topicId, isFavor)
    if (result?.code === 200) {
      this.setState({
        favorV2: {
          [topicId]: isFavor
        },
        favorCount: {
          [topicId]: result?.data?.total || 0
        }
      })
      this.save('favorV2')
      this.save('favorCount')
    }

    return result
  }

  /** 检查帖子收藏 */
  checkIsFavor = async (topicId: TopicId) => {
    await this.init('favorCount')

    const { myUserId } = syncUserStore()
    if (!myUserId) return false

    const result = await is(myUserId, topicId)
    if (result?.code === 200) {
      if (result?.data?.total) {
        this.setState({
          favorCount: {
            [topicId]: result.data.total || 0
          }
        })
        this.save('favorCount')
      }
      return true
    }

    return false
  }

  /** 上传收藏帖子到云端 */
  uploadFavorTopic = () => {
    const { id } = syncUserStore().userInfo
    return put({
      path: `topic/${id}.json`,
      content: escape(JSON.stringify(this.favorTopic))
    })
  }

  /** @deprecated 同步云端收藏帖子 */
  downloadFavorTopic = async () => {
    const { id } = syncUserStore().userInfo
    const { content } = await read({
      path: `topic/${id}.json`
    })
    if (!content) return false

    try {
      const { favor } = this.state
      const { _favor, ...cloudTopic } = JSON.parse(unescape(content))
      this.setState({
        favor: {
          ..._favor,
          ...favor
        },
        cloudTopic
      })

      this.save('favor')
      this.save('cloudTopic')
      return true
    } catch (error) {
      return false
    }
  }

  /** 上传当前设置到云端 */
  uploadSetting = () => {
    const { id } = syncUserStore().userInfo
    return update(`rakuen_setting_${id}`, this.setting)
  }

  /** 恢复到云端的设置 */
  downloadSetting = async () => {
    const { id } = syncUserStore().userInfo
    if (!id) return false

    const key = 'setting'
    try {
      const setting = await get(`rakuen_setting_${id}`)
      if (setting) {
        const { blockKeywords, blockGroups, blockUserIds } = setting
        this.setting.blockKeywords.forEach(item => {
          if (!blockKeywords.includes(item)) blockKeywords.push(item)
        })
        this.setting.blockGroups.forEach(item => {
          if (!blockGroups.includes(item)) blockGroups.push(item)
        })
        this.setting.blockUserIds.forEach(item => {
          if (!blockUserIds.includes(item)) blockUserIds.push(item)
        })

        this.setState({
          [key]: {
            ...this.setting,
            // ...setting,
            blockKeywords,
            blockGroups,
            blockUserIds
          }
        })
        this.save(key)
        return true
      }
    } catch {}

    // 旧逻辑, 暂时保留
    try {
      const data = await read({
        path: `rakuen-setting/${id}.json`
      })
      if (!data?.content) return false

      const setting = JSON.parse(data.content)

      // 屏蔽的数据还需要跟现在的合并
      let { blockKeywords, blockGroups, blockUserIds } = setting
      blockKeywords = JSON.parse(unescape(blockKeywords))
      blockGroups = JSON.parse(unescape(blockGroups))
      blockUserIds = JSON.parse(unescape(blockUserIds))
      this.setting.blockKeywords.forEach(item => {
        if (!blockKeywords.includes(item)) blockKeywords.push(item)
      })
      this.setting.blockGroups.forEach(item => {
        if (!blockGroups.includes(item)) blockGroups.push(item)
      })
      this.setting.blockUserIds.forEach(item => {
        if (!blockUserIds.includes(item)) blockUserIds.push(item)
      })

      this.setState({
        [key]: {
          ...this.setting,
          // ...setting,
          blockKeywords,
          blockGroups,
          blockUserIds
        }
      })
      this.save(key)
      return true
    } catch {}

    this.log('downloadSetting', 'downloadSetting error')

    return false
  }

  /** 屏蔽用户的屏蔽次数 +1 */
  trackBlockedUser = (userId: UserId) => {
    const key = 'blockedUsersTrack'
    this.setState({
      [key]: {
        [userId]: this.blockedUsersTrack(userId) + 1
      }
    })
    this.save(key)
  }

  /** 屏蔽用户的屏蔽次数 +1 */
  trackBlocked = (keyword: string) => {
    const key = 'blockedTrack'
    this.setState({
      [key]: {
        [keyword]: this.blockedTrack(keyword) + 1
      }
    })
    this.save(key)
  }

  /** 更新书签 */
  toggleBookmarks = (href: string, title: string = '') => {
    if (!href) return false

    const key = 'bookmarks'
    this.setState({
      [key]: this.bookmarksSaved(href)
        ? this.bookmarks.filter(item => item.href !== href)
        : [
            {
              href,
              title
            },
            ...this.bookmarks
          ]
    })
    this.save(key)
  }

  /** 追踪特定用户回复 */
  trackUsersComment = (userName: UserId) => {
    const key = 'commentTrack'
    const value = [...(this.setting.commentTrack || [])]
    if (!value.includes(userName)) value.unshift(userName)

    if (!syncSystemStore().advance && value.length > APP_FREE_TRACK_COMMENT) {
      confirm(
        `普通会员最大支持 ${APP_FREE_TRACK_COMMENT} 人，是否用此用户替代先前的特别关注？`,
        () => {
          this.setSetting(key, [userName])
          info('已关注')
          return true
        }
      )
      return false
    }

    if (value.length > APP_ADVANCE_TRACK_COMMENT) {
      confirm(
        `高级会员当前已满最大支持 ${APP_ADVANCE_TRACK_COMMENT} 人，是否用此用户替代最早的特别关注？`,
        () => {
          value.pop()
          this.setSetting(key, value)
          info('已关注')
          return true
        }
      )
      return false
    }

    this.setSetting(key, value)
    info('已关注')
    return true
  }

  /** 取消追踪特定用户回复 */
  cancelTrackUsersComment = (userName: UserId) => {
    const key = 'commentTrack'
    const value = (this.setting[key] || []).filter(item => item !== userName)
    this.setSetting(key, value)
    info('已取消')
    return true
  }
}
