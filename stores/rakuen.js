/* eslint-disable prefer-destructuring */
/*
 * 超展开
 * @Author: czy0729
 * @Date: 2019-04-26 13:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 22:42:36
 */
import { observable, computed } from 'mobx'
import { date } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import { LIST_EMPTY, LIST_LIMIT } from '@constants'
import { HTML_RAKUEN, HTML_TOPIC } from '@constants/html'
import { MODEL_RAKUEN_SCOPE, MODEL_RAKUEN_TYPE } from '@constants/model'
import store from '@utils/store'

const LIST_LIMIT_COMMENTS = 6
const initScope = MODEL_RAKUEN_SCOPE.getValue('全局聚合')
const initType = MODEL_RAKUEN_TYPE.getValue('全部')

// const INIT_RAKUEN_ITEM = {
//   group: '', // 小组名称
//   groupHref: '', // 小组地址
//   avatar: '', // 作者头像
//   title: '', // 超展开标题
//   href: '', // 链接
//   replies: '', // 回复数
//   time: '' // 发帖时间
// }
const INIT_TOPIC = {
  groupThumb: '', // 小组图片
  group: '', // 小组名称
  groupHref: '', // 小组地址
  avatar: '', // 作者头像
  userName: '', // 作者名称
  userId: '', // 作者Id
  userSign: '', // 作者签名
  time: '', // 发帖时间
  title: '', // 帖子标题
  message: '' // 帖子内容
}
// const INIT_COMMENTS_ITEM = {}

class Rakuen extends store {
  state = observable({
    // @todo 屏蔽用, 广告姫关键词
    adBlock: [],

    // 超展开列表
    rakuen: {
      // [`${scope}|${type}`]: LIST_EMPTY | INIT_RAKUEN_ITEM
    },

    // 帖子内容
    topic: {
      // [topicId]: INIT_TOPIC
    },

    // 帖子回复
    comments: {
      // [topicId]: LIST_EMPTY | INIT_COMMENTS_ITEM
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('rakuen'),
      this.getStorage('topic'),
      this.getStorage('comments')
    ])
    const state = await res
    this.setState({
      rakuen: state[0],
      topic: state[1],
      comments: state[2]
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 超展开
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  rakuen(scope = initScope, type = initType) {
    return computed(
      () => this.state.rakuen[`${scope}|${type}`] || LIST_EMPTY
    ).get()
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

  // -------------------- fetch --------------------
  /**
   * 获取超展开聚合列表 (高流量, 20k左右1次)
   * @issue 官网没有分页, 这接口居然一次返回250项
   * 为了提高体验, 做模拟分页加载效果
   */
  async fetchRakuen({ scope = initScope, type = initType } = {}, refresh) {
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
            _loaded: date()
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
    this.setStorage(key)

    return res
  }

  /**
   * 获取帖子内容和留言 (高流量, 200楼回复的大概180k / gzip25k左右一次)
   * @issue 官网没有分页, 某些帖子一次性返回几千回复, 不分页容易导致奔溃
   * 为了提高体验, 做模拟分页加载效果
   */
  async fetchTopic({ topicId = 0 }, refresh) {
    let res
    const topicKey = 'topic'
    const commentsKey = 'comments'
    const stateKey = topicId

    if (refresh) {
      // 重新请求
      res = _fetchTopic({ topicId })
      const { topic, comments } = await res
      const _loaded = date()

      // 缓存帖子内容
      this.setState({
        [topicKey]: {
          [stateKey]: {
            ...topic,
            _loaded
          }
        }
      })
      this.setStorage(topicKey)

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
            _loaded
          }
        }
      })
      this.setStorage(commentsKey)
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
      this.setStorage(commentsKey)
    }

    return res
  }

  // -------------------- action --------------------
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

async function _fetchTopic({ topicId = 0 }) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    url: `!${HTML_TOPIC(topicId)}`
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node

  // 帖子
  let topic = {}
  const groupHTML = HTML.match(
    /<div id="pageHeader">(.+?)<\/div><hr class="board" \/>/
  )

  // 分组信息
  if (groupHTML) {
    const tree = HTMLToTree(groupHTML[1])
    topic.title = tree.children[0].text[1] || ''

    node = findTreeNode(tree.children, 'h1 > a > img')
    topic.groupThumb = node ? node[0].attrs.src : ''

    node = findTreeNode(tree.children, 'h1 > a|class=avatar')
    topic.group = node ? node[0].text[0] : ''
    topic.groupHref = node ? node[0].attrs.href : ''
  }

  // 楼主层信息
  const topFloorHTML = HTML.match(
    /<div id="post_\d+" class="postTopic light_odd clearit">(.+?)<\/div><div id="sliderContainer"/
  )
  if (topFloorHTML) {
    const tree = HTMLToTree(topFloorHTML[1])
    topic = {
      ...topic,
      ...getTopFloorAttrs(tree)
    }
  }

  // 帖子内容
  const topicHTML = HTML.match(
    /<div class="topic_content">(.+?)<\/div><\/div><\/div><div id="sliderContainer"/
  )
  if (topicHTML) {
    topic.message = topicHTML[1]
  }

  // -------------------- 分析留言 --------------------
  // 留言层信息
  const commentHTML = HTML.match(
    /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><div style="margin-top/
  )
  const comments = []
  if (commentHTML) {
    // 回复内容需要渲染html就不能使用node查找了, 而且子回复也在里面
    const messageHTML = commentHTML[1]
      .match(/<div class="reply_content">(.+?)<\/div><\/div><\/div><\/div>/g)
      .map(item => item.replace(/^<div class="reply_content">|<\/div>$/g, ''))

    const tree = HTMLToTree(commentHTML[1])
    tree.children.forEach((item, index) => {
      // @todo 暂时只显示前60楼, 因为写法是一次性计算的, 计算太大会爆栈闪退, 待优化
      if (index >= 60) {
        return
      }

      const sub = [] // 存放子回复
      const subHTML = messageHTML[index].match(
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
            log(message)
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
        message = messageHTML[index].match(
          /<div class="message.*">(.+?)<\/div><div class="topic_sub_reply"/
        )[1]
      } else {
        message = messageHTML[index].match(
          /<div class="message.*">(.+?)<\/div><\/div>/
        )[1]
      }
      comments.push({
        ...getCommentAttrs(item),
        message,
        sub
      })
    })
  }

  return Promise.resolve({
    topic,
    comments
  })
}

/**
 * 分析楼主层信息
 * @param {*} tree
 */
function getTopFloorAttrs(tree) {
  let node
  const { children } = tree
  const id = ''

  node = findTreeNode(children, 'div > small|text')
  const time = node ? node[0].text[0].replace('#1 - ', '') : ''

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
}

/**
 * 分析留言层信息
 * @param {*} tree
 */
function getCommentAttrs(tree) {
  let node
  const { children } = tree
  const id = tree.attrs.id.replace('post_', '')

  node = findTreeNode(children, 'div|text&class=re_info')
  const time = node ? node[0].text[0].replace(' - ', '') : ''

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

  return {
    id,
    time,
    floor,
    avatar,
    userId,
    userName: HTMLDecode(userName),
    userSign: HTMLDecode(userSign)
  }
}
