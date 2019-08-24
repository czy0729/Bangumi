/*
 * 超展开
 * @Author: czy0729
 * @Date: 2019-04-26 13:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 02:41:04
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML, xhr } from '@utils/fetch'
import { HTMLTrim } from '@utils/html'
import { HOST, LIST_EMPTY, LIST_LIMIT } from '@constants'
import {
  HTML_NOTIFY,
  HTML_TOPIC,
  HTML_ACTION_RAKUEN_REPLY,
  HTML_GROUP_INFO,
  HTML_GROUP
} from '@constants/html'
import store from '@utils/store'
import {
  NAMESPACE,
  DEFAULT_SCOPE,
  DEFAULT_TYPE,
  // LIST_COMMENTS_LIMIT,
  INIT_READED_ITEM,
  INIT_TOPIC,
  INIT_NOTIFY,
  INIT_SETTING,
  INIT_GROUP_INFO,
  INIT_GROUP_ITEM
} from './init'
import {
  fetchRakuen,
  cheerioGroupInfo,
  analysisGroup,
  cheerioNotify,
  cheerioTopic
} from './common'

class Rakuen extends store {
  state = observable({
    // 超展开列表
    rakuen: {
      // [`${scope}|${type}`]: LIST_EMPTY | INIT_RAKUEN_ITEM
    },

    // 帖子历史查看信息
    readed: {
      // [topicId]: INIT_READED_ITEM
    },

    // 帖子内容
    topic: {
      // [topicId]: INIT_TOPIC
    },

    // 帖子回复
    comments: {
      // [topicId]: LIST_EMPTY | INIT_COMMENTS_ITEM
    },

    // 电波提醒
    notify: INIT_NOTIFY,

    // 超展开设置
    setting: INIT_SETTING,

    // 小组信息
    groupInfo: {
      // [groupId]: INIT_GROUP_INFO
    },

    // 小组帖子列表
    group: {
      // [groupId|page]: [] | INIT_GROUP_ITEM
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('rakuen', NAMESPACE),
      this.getStorage('readed', NAMESPACE),
      this.getStorage('topic', NAMESPACE),
      this.getStorage('comments', NAMESPACE),
      this.getStorage('notify', NAMESPACE),
      this.getStorage('setting', NAMESPACE),
      this.getStorage('groupInfo', NAMESPACE)
    ])
    const state = await res
    this.setState({
      rakuen: state[0] || {},
      readed: state[1] || {},
      topic: state[2] || {},
      comments: state[3] || {},
      notify: state[4] || INIT_NOTIFY,
      setting: state[5] || INIT_SETTING,
      groupInfo: state[6] || {}
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 超展开
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  rakuen(scope = DEFAULT_SCOPE, type = DEFAULT_TYPE) {
    return computed(
      () => this.state.rakuen[`${scope}|${type}`] || LIST_EMPTY
    ).get()
  }

  /**
   * 帖子历史查看信息
   * @param {*} topicId
   */
  readed(topicId = 0) {
    return computed(() => this.state.readed[topicId] || INIT_READED_ITEM).get()
  }

  /**
   * 帖子内容
   * @param {*} topicId
   */
  topic(topicId = 0) {
    return computed(() => this.state.topic[topicId] || INIT_TOPIC).get()
  }

  /**
   * 帖子回复
   * @param {*} topicId
   */
  comments(topicId = 0) {
    return computed(() => this.state.comments[topicId] || LIST_EMPTY).get()
  }

  /**
   * 电波提醒
   */
  @computed get notify() {
    return this.state.notify
  }

  /**
   * 超展开设置
   */
  @computed get setting() {
    return this.state.setting
  }

  /**
   * 小组信息
   * @param {*} groupId
   */
  groupInfo(groupId) {
    return computed(
      () => this.state.groupInfo[groupId] || INIT_GROUP_INFO
    ).get()
  }

  /**
   * 小组帖子列表
   * @param {*} groupId
   * @param {*} page
   */
  group(groupId, page = 1) {
    return computed(
      () => this.state.group[`${groupId}|${page}`] || INIT_GROUP_ITEM
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取超展开聚合列表 (高流量, 20k左右1次)
   * @issue 官网没有分页, 这接口居然一次返回250项
   * 为了提高体验, 做模拟分页加载效果
   */
  async fetchRakuen(
    { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE } = {},
    refresh
  ) {
    let res
    const key = 'rakuen'
    const stateKey = `${scope}|${type}`

    // 制造分页数据
    if (refresh) {
      const res = fetchRakuen({ scope, type })
      const rakuen = await res
      this.setState({
        [key]: {
          [stateKey]: {
            list: rakuen.slice(0, LIST_LIMIT),
            pagination: {
              page: 1,
              pageTotal: Math.ceil(rakuen.length / LIST_LIMIT)
            },
            _list: rakuen,
            _loaded: getTimestamp()
          }
        }
      })
    } else {
      // 加载下一页
      const rakuen = this.rakuen(scope, type)
      const page = rakuen.pagination.page + 1
      this.setState({
        [key]: {
          [stateKey]: {
            ...rakuen,
            list: rakuen._list.slice(0, LIST_LIMIT * page),
            pagination: {
              ...rakuen.pagination,
              page
            }
          }
        }
      })
    }
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 获取帖子内容和留言
   */
  async fetchTopic({ topicId = 0 }) {
    const HTML = await fetchHTML({
      url: HTML_TOPIC(topicId)
    })
    const { topic, comments } = cheerioTopic(HTML)
    const _loaded = getTimestamp()

    // 缓存帖子内容
    const stateKey = topicId
    const topicKey = 'topic'
    this.setState({
      [topicKey]: {
        [stateKey]: {
          ...topic,
          _loaded
        }
      }
    })
    this.setStorage(topicKey, undefined, NAMESPACE)

    // 缓存帖子回复
    const commentsKey = 'comments'
    this.setState({
      [commentsKey]: {
        [stateKey]: {
          list: comments,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _list: [],
          _loaded
        }
      }
    })
    this.setStorage(commentsKey, undefined, NAMESPACE)

    return Promise.resolve({
      topic,
      comments
    })
  }

  /**
   * 电波提醒
   * @param {*} analysis 是否分析回复内容
   */
  async fetchNotify(analysis = false) {
    const res = fetchHTML({
      url: HTML_NOTIFY()
    })
    const raw = await res
    const HTML = HTMLTrim(raw)
    const { _loaded } = this.notify
    let { unread, clearHref, list } = this.notify

    // 清除动作
    const clearHTML = HTML.match(
      /<a id="notify_ignore_all" href="(.+?)">\[知道了\]<\/a>/
    )
    if (clearHTML) {
      clearHref = clearHTML[1]
    }

    // 未读数
    const countHTML = HTML.match(/<span id="notify_count">(.+?)<\/span>/)
    if (countHTML) {
      unread = parseInt(countHTML[1])
    }

    // 回复内容
    if (analysis) {
      const listHTML = HTML.match(
        /<div id="comment_list">(.+?)<\/div><\/div><\/div><div id="footer"/
      )
      if (listHTML) {
        list = cheerioNotify(listHTML[1])
      }
    }

    const key = 'notify'
    this.setState({
      [key]: {
        unread,
        clearHref,
        list,
        _loaded: analysis ? getTimestamp() : _loaded
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 小组信息
   */
  fetchGroupInfo = async ({ groupId = 0 }) => {
    const html = await fetchHTML({
      url: HTML_GROUP_INFO(groupId)
    })
    const groupInfo = cheerioGroupInfo(html)

    const key = 'groupInfo'
    this.setState({
      [key]: {
        [groupId]: {
          ...groupInfo,
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(groupInfo)
  }

  /**
   * 小组帖子列表
   */
  fetchGroup = async ({ groupId, page }) => {
    const html = await fetchHTML({
      url: `!${HTML_GROUP(groupId, page)}`
    })
    const group = analysisGroup(html)
    this.setState({
      group: {
        [`${groupId}|${page}`]: {
          list: group || [],
          _loaded: getTimestamp()
        }
      }
    })

    return Promise.resolve(group)
  }

  // -------------------- action --------------------
  /**
   * 清除电波提醒未读
   */
  doClearNotify = async () => {
    const { clearHref } = this.notify
    if (clearHref) {
      await fetchHTML({
        url: `${HOST}${clearHref}`
      })

      const key = 'notify'
      this.setState({
        [key]: {
          ...this.notify,
          unread: 0,
          clearHTML: ''
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 回复帖子 | 回复帖子子回复
   */
  doReply = async ({ topicId, type = 'group/topic', ...other }, success) => {
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

  // -------------------- page --------------------
  /**
   * 更新帖子历史查看信息
   * @param {*} topicId 帖子Id
   * @param {Int} replies 回复数
   */
  updateTopicReaded = (topicId, replies = 0) => {
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
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`帖子展开引用`
   */
  switchQuote = () => {
    const { quote } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        quote: !quote
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`屏蔽广告姬`
   */
  switchIsBlockDefaultUser = () => {
    const { isBlockDefaultUser } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        isBlockDefaultUser: !isBlockDefaultUser
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 添加屏蔽小组
   * @param {string} group 小组名字
   */
  addBlockGroup = group => {
    const { blockGroups } = this.setting
    if (blockGroups.includes(group)) {
      return
    }

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockGroups: [...blockGroups, group]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 删除屏蔽小组
   * @param {string} group 小组名字
   */
  deleteBlockGroup = group => {
    const { blockGroups } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockGroups: blockGroups.filter(item => item !== group)
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 添加屏蔽用户
   * @param {string} userNameSpace `${userName}@${userId}`
   */
  addBlockUser = userNameSpace => {
    const { blockUserIds } = this.setting
    if (blockUserIds.includes(userNameSpace)) {
      return
    }

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockUserIds: [...blockUserIds, userNameSpace]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 删除屏蔽用户
   * @param {string} userNameSpace `${userName}@${userId}`
   */
  deleteBlockUser = userNameSpace => {
    const { blockUserIds } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        blockUserIds: blockUserIds.filter(item => item !== userNameSpace)
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`标记坟贴`
   */
  switchIsMarkOldTopic = () => {
    const { isMarkOldTopic } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        isMarkOldTopic: !isMarkOldTopic
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }
}

export default new Rakuen()
