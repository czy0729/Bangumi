/* eslint-disable prefer-destructuring */
/*
 * 超展开
 * @Author: czy0729
 * @Date: 2019-04-26 13:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-13 17:28:31
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML, xhr } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import { IOS, HOST, LIST_EMPTY, LIST_LIMIT } from '@constants'
import {
  HTML_RAKUEN,
  HTML_TOPIC,
  HTML_NOTIFY,
  HTML_ACTION_RAKUEN_REPLY
} from '@constants/html'
import store from '@utils/store'
import {
  NAMESPACE,
  DEFAULT_SCOPE,
  DEFAULT_TYPE,
  LIST_LIMIT_COMMENTS,
  INIT_READED_ITEM,
  INIT_TOPIC,
  INIT_NOTIFY,
  INIT_SETTING
} from './init'

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
    setting: INIT_SETTING
  })

  async init() {
    const res = Promise.all([
      this.getStorage('rakuen', NAMESPACE),
      this.getStorage('readed', NAMESPACE),
      this.getStorage('topic', NAMESPACE),
      this.getStorage('comments', NAMESPACE),
      this.getStorage('notify', NAMESPACE),
      this.getStorage('setting', NAMESPACE)
    ])
    const state = await res
    this.setState({
      rakuen: state[0] || {},
      readed: state[1] || {},
      topic: state[2] || {},
      comments: state[3] || {},
      notify: state[4] || INIT_NOTIFY,
      setting: state[5] || INIT_SETTING
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
      const res = _fetchRakuen({ scope, type })
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
   * 获取帖子内容和留言 (高流量, 200楼回复的大概180k / gzip25k左右一次)
   * @issue 官网没有分页, 某些帖子一次性返回几千回复, 不分页容易导致奔溃
   * 为了提高体验, 做模拟分页加载效果
   */
  async fetchTopic({ topicId = 0 }, refresh, reverse) {
    let res
    const topicKey = 'topic'
    const commentsKey = 'comments'
    const stateKey = topicId

    if (refresh) {
      // 重新请求
      res = _fetchTopic({ topicId }, reverse)
      const { topic, comments } = await res
      const _loaded = getTimestamp()

      // 缓存帖子内容
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
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            list: comments.slice(0, LIST_LIMIT_COMMENTS),
            pagination: {
              page: 1,
              pageTotal: Math.ceil(comments.length / LIST_LIMIT_COMMENTS)
            },
            _list: comments,
            _loaded,
            _reverse: reverse
          }
        }
      })
      this.setStorage(commentsKey, undefined, NAMESPACE)
    } else {
      // 加载下一页留言
      const comments = this.comments(topicId)
      const page = comments.pagination.page + 1
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            ...comments,
            list: comments._list.slice(0, LIST_LIMIT_COMMENTS * page),
            pagination: {
              ...comments.pagination,
              page
            }
          }
        }
      })
      this.setStorage(commentsKey, undefined, NAMESPACE)
    }

    return res
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
        list = []
        const tree = HTMLToTree(listHTML[1])
        tree.children.forEach((item, index) => {
          if (index > 40) {
            return
          }

          const { children } = item
          let node

          node = findTreeNode(children, 'a > span|style')
          const avatar = node
            ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
            : ''

          node = findTreeNode(children, 'div > a|text&href')
          const userName = node ? node[0].text[0] : ''
          const userId = node
            ? node[0].attrs.href.replace(`${HOST}/user/`, '')
            : ''

          node = findTreeNode(children, 'div > div > a|text&href')
          const title = node ? node[0].text[0] : ''
          const href = node ? node[0].attrs.href.replace(/#post_\d+/, '') : ''

          node = findTreeNode(children, 'div > div|text')
          const message = node ? node[0].text[0] : ''
          const message2 = node ? node[0].text[1] : ''

          list.push({
            avatar,
            userName,
            userId,
            title,
            href,
            message,
            message2
          })
        })
      }
    }

    const key = 'notify'
    this.setState({
      [key]: {
        unread,
        clearHref,
        list
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
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
  updateTopicReaded = (topicId, replies) => {
    const key = 'readed'
    this.setState({
      [key]: {
        [topicId]: {
          time: getTimestamp(),
          replies
        }
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
}

export default new Rakuen()

async function _fetchRakuen({ scope, type } = {}) {
  // -------------------- 请求HTML --------------------
  const res = fetchHTML({
    url: HTML_RAKUEN(scope, type)
  })
  const raw = await res
  const HTML = HTMLTrim(raw).match(
    /<div id="eden_tpc_list"><ul>(.+?)<\/ul><\/div>/
  )

  // -------------------- 分析HTML --------------------
  const rakuen = []
  if (HTML) {
    const tree = HTMLToTree(HTML[1])
    tree.children.forEach(item => {
      const avatar = item.children[0].children[0].attrs.style.replace(
        /background-image:url\('|'\)/g,
        ''
      )

      const { children } = item.children[1]
      const title = children[0].text[0]
      const { href = '' } = children[0].attrs
      const replies = children[1].text[0]

      // 小组有可能是没有的
      let group = ''
      let groupHref = ''
      let time = ''
      if (children.length === 3) {
        time = children[2].children[0].text[0]
      } else {
        group = children[3].text[0]
        groupHref = children[3].attrs.href
        time = children[4] ? children[4].text[0] : children[3].text[0]
      }

      const data = {
        title: HTMLDecode(title),
        avatar,
        href,
        replies,
        group: HTMLDecode(group),
        groupHref,
        time
      }
      rakuen.push(data)
    })
  }

  return Promise.resolve(rakuen)
}

async function _fetchTopic({ topicId = 0 }, reverse) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    // @todo 这统一帖子内容的接口IOS带cookie访问直接掉线, 需解决
    url: IOS ? `!${HTML_TOPIC(topicId)}` : HTML_TOPIC(topicId)
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node
  let matchHTML

  // 帖子
  let topic = {}

  // 回复表单凭据
  matchHTML = HTML.match(
    /<input type="hidden" name="formhash" value="(.+?)" \/>/
  )
  if (matchHTML) {
    topic.formhash = matchHTML[1]
  }

  // 分组信息
  matchHTML = HTML.match(
    /<div id="pageHeader">(.+?)<\/div><hr class="board" \/>/
  )
  if (matchHTML) {
    const tree = HTMLToTree(matchHTML[1])
    topic.title = tree.children[0].text[1] || ''

    node = findTreeNode(tree.children, 'h1 > a > img')
    topic.groupThumb = node ? node[0].attrs.src : ''

    node = findTreeNode(tree.children, 'h1 > a|class=avatar')
    topic.group = node ? node[0].text[0] : ''
    topic.groupHref = node ? node[0].attrs.href : ''
  }

  // 楼主层信息
  matchHTML = HTML.match(
    /<div id="post_\d+" class="postTopic light_odd clearit">(.+?)<\/div><div id="sliderContainer"/
  )
  if (matchHTML) {
    const tree = HTMLToTree(matchHTML[1])
    topic = {
      ...topic,
      ...getTopFloorAttrs(tree)
    }
  }

  // 帖子内容
  matchHTML = HTML.match(
    /<div class="topic_content">(.+?)<\/div><\/div><\/div><div id="sliderContainer"/
  )
  if (matchHTML) {
    topic.message = matchHTML[1]
  }

  // -------------------- 分析留言 --------------------
  // 留言层信息
  matchHTML =
    // 登陆的情况
    HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><hr/
    ) ||
    // 没登陆的情况
    HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><div style="margin-top/
    )

  const comments = analysisComments(matchHTML, reverse)

  return Promise.resolve({
    topic,
    comments
  })
}

/**
 * 分析留言层信息
 * @param {*} HTML
 */
export function analysisComments(HTML, reverse) {
  const comments = []
  if (!HTML) {
    return comments
  }

  // 回复内容需要渲染html就不能使用node查找了, 而且子回复也在里面
  let messageHTML = HTML[1]
    .match(/<div class="reply_content">(.+?)<\/div><\/div><\/div><\/div>/g)
    .map(item => item.replace(/^<div class="reply_content">|<\/div>$/g, ''))
  if (reverse && messageHTML.length) {
    messageHTML = messageHTML.reverse()
  }

  const tree = HTMLToTree(HTML[1])
  let { children } = tree
  if (reverse && children.length) {
    children = children.reverse()

    // 会有一个评论被折叠的提示
    if (children.length > messageHTML.length) {
      children.shift()
    }
  }
  children.forEach((item, index) => {
    // @todo 暂时只显示前100楼, 因为写法是一次性计算的, 计算太大会爆栈闪退, 待优化
    if (index >= 100) {
      return
    }

    const sub = [] // 存放子回复
    const subHTML =
      messageHTML[index] &&
      messageHTML[index].match(
        /<div class="topic_sub_reply" id="topic_reply_\d+">(.+?)$/
      )
    if (subHTML) {
      const subMessageHTML = subHTML[1]
        .match(/<div id="post_\d+"(.+?)<\/div><\/div><\/div>/g)
        .map(item =>
          item.replace(
            /<div id="post_\d+" class="sub_reply_bgclearit">|<\/div>$/g,
            ''
          )
        )

      const subTree = HTMLToTree(subHTML[1])
      subTree.children.forEach((item, index) => {
        // 子楼层回复内容
        if (subMessageHTML[index]) {
          const message = subMessageHTML[index].match(
            /<div class="cmt_sub_content">(.+?)<\/div><\/div>/
          )[1]
          sub.push({
            ...getCommentAttrs(item),
            message
          })
        }
      })
    }

    // 楼层回复内容
    let message
    if (sub.length) {
      // 某些界面class="message clearit"不一致, 抹平差异
      const match =
        messageHTML[index] &&
        messageHTML[index]
          .replace('class="message clearit"', 'class="message"')
          .match(
            /<div class="message.*">(.+?)<\/div><div class="topic_sub_reply"/
          )
      message = match ? match[1] : ''
    } else {
      const match =
        messageHTML[index] &&
        messageHTML[index]
          .replace('class="message clearit"', 'class="message"')
          .match(/<div class="message">(.+?)<\/div><\/div>/)
      message = match ? match[1] : ''
    }

    comments.push({
      ...getCommentAttrs(item),
      message,
      sub
    })
  })

  return comments
}

/**
 * 分析楼主层信息
 * @param {*} tree
 */
function getTopFloorAttrs(tree) {
  try {
    let node
    const { children } = tree
    const id = ''

    node = findTreeNode(children, 'div > small|text')
    const time = node ? node[0].text[0].replace(/#1 - | \/ /g, '') : ''
    const floor = '#1'

    node = findTreeNode(children, 'a > span|style~background-image')
    const avatar = node
      ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
      : ''

    node = findTreeNode(children, 'div > a|text&class~l&href~/user/')
    const userId = node ? node[0].attrs.href.replace('/user/', '') : ''
    const userName = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'div > span|text&class=tip_j')
    const userSign = node ? node[0].text[0] : ''

    return {
      id,
      time,
      floor,
      avatar,
      userId,
      userName: HTMLDecode(userName),
      userSign: HTMLDecode(userSign)
    }
  } catch (error) {
    // do nothing
  }

  return {
    id: '',
    time: '',
    floor: '',
    avatar: '',
    userId: '',
    userName: '',
    userSign: ''
  }
}

/**
 * 分析留言层信息
 * @param {*} tree
 */
function getCommentAttrs(tree) {
  try {
    let node
    const { children } = tree
    const id = tree.attrs.id.replace('post_', '')

    node = findTreeNode(children, 'div|text&class=re_info')
    const time = node ? node[0].text[0].replace(/ - |\/ /g, '') : ''

    node = findTreeNode(children, 'div > a|class=floor-anchor')
    const floor = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'a > span|style~background-image')
    const avatar = node
      ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
      : ''

    node = findTreeNode(children, 'div > a|text&class~l&href~/user/')
    const userId = node ? node[0].attrs.href.replace('/user/', '') : ''
    const userName = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'div > span|text&class=tip_j')
    const userSign = node ? node[0].text[0] : ''

    // sub reply
    node = findTreeNode(children, 'div > a|onclick')
    const replySub = node ? node[0].attrs.onclick : ''

    return {
      id,
      time,
      floor,
      avatar,
      userId,
      userName: HTMLDecode(userName),
      userSign: HTMLDecode(userSign),
      replySub
    }
  } catch (error) {
    // do nothing
  }

  return {
    id: '',
    time: '',
    floor: '',
    avatar: '',
    userId: '',
    userName: '',
    userSign: '',
    replySub: ''
  }
}
