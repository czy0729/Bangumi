/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-06 15:05:41
 */
import { getTimestamp, HTMLTrim } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { get } from '@utils/kv'
import {
  CDN_RAKUEN,
  CDN_RAKUEN_USER_TOPICS,
  DEV,
  HTML_BLOG,
  HTML_BOARD,
  HTML_GROUP,
  HTML_GROUP_INFO,
  HTML_GROUP_MINE,
  HTML_NOTIFY,
  HTML_RAKUEN_HOT,
  HTML_REVIEWS,
  HTML_TOPIC,
  LIMIT_LIST,
  LIST_EMPTY
} from '@constants'
import {
  Id,
  RakuenScope,
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeMono,
  SubjectId,
  TopicId,
  UserId
} from '@types'
import Computed from './computed'
import { getInt } from './utils'
import {
  analysisGroup,
  cheerioBlog,
  cheerioBoard,
  cheerioGroupInfo,
  cheerioHot,
  cheerioMine,
  cheerioNotify,
  cheerioReviews,
  cheerioTopic,
  fetchRakuen
} from './common'
import { DEFAULT_SCOPE, DEFAULT_TYPE, INIT_TOPIC } from './init'

export default class Fetch extends Computed {
  /**
   * 获取超展开聚合列表 (高流量, 20k左右1次)
   * @issue 官网没有分页, 这接口居然一次返回250项
   * 为了提高体验, 做模拟分页加载效果
   */
  fetchRakuen = async (
    args: {
      scope?: RakuenScope
      type?: RakuenType | RakuenTypeMono | RakuenTypeGroup
    },
    refresh?: boolean
  ) => {
    const { scope = DEFAULT_SCOPE, type = DEFAULT_TYPE } = args || {}

    const key = 'rakuen'
    const stateKey = `${scope}|${type}`
    let res

    // 制造分页数据
    if (refresh) {
      const res = fetchRakuen({ scope, type })
      const rakuen = await res
      this.setState({
        [key]: {
          [stateKey]: {
            list: rakuen.slice(0, LIMIT_LIST),
            pagination: {
              page: 1,
              pageTotal: Math.ceil(rakuen.length / LIMIT_LIST)
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
            list: rakuen._list.slice(0, LIMIT_LIST * page),
            pagination: {
              ...rakuen.pagination,
              page
            }
          }
        }
      })
    }
    this.save(key)

    return res
  }

  /** 获取帖子内容和留言 */
  fetchTopic = async (args: { topicId: TopicId }) => {
    const { topicId } = args || {}
    const HTML = await fetchHTML({
      url: HTML_TOPIC(topicId)
    })
    const { topic, comments, likes } = cheerioTopic(HTML)
    const _loaded = getTimestamp()

    const stateKey = topicId
    const topicKey = 'topic'
    const last = getInt(topicId)
    const commentsKey = `comments${last}` as const
    const likesKey = 'likes'

    this.setState({
      [topicKey]: {
        [stateKey]: {
          ...topic,
          _loaded
        }
      },
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
      },
      [likesKey]: {
        [stateKey]: likes
      }
    })

    this.save(topicKey)
    this.save(commentsKey)
    this.save(likesKey)
    this.updateGroupThumb(topic.group, topic.groupThumb)

    return {
      topic,
      comments,
      likes
    }
  }

  /** @deprecated CDN 获取帖子信息 */
  fetchTopicFromCDN = async (topicId: string | number) => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_RAKUEN(topicId)
      })

      const data = {
        ...INIT_TOPIC,
        ...JSON.parse(_response)
      }
      const key = 'topicFormCDN'
      this.setState({
        [key]: {
          [topicId]: data
        }
      })
      return data
    } catch (error) {
      return INIT_TOPIC
    }
  }

  /** 装载云端帖子缓存数据 */
  fetchTopicFromOSS = async (topicId: TopicId) => {
    const now = getTimestamp()
    const topic = this.topic(topicId)

    // 帖子数据存在且比较新鲜, 不再请求, 应直接使用帖子数据
    if (topic._loaded && now - Number(topic._loaded) <= 60 * 60 * 24) {
      return true
    }

    try {
      const data = await get(`topic_${topicId.replace('/', '_')}`)
      if (!data) return false

      const { ts, topic, comments } = data
      if (typeof topic === 'object' && typeof comments === 'object') {
        const stateKey = topicId
        const topicKey = 'topic'
        const last = getInt(topicId)
        const commentsKey = `comments${last}` as const

        if (comments?.list?.[0]?.floor) {
          if (
            comments.list.length >= 2 &&
            comments.list[0].floor.localeCompare(comments.list[1].floor)
          ) {
            comments.list.reverse()
          }
        }

        this.setState({
          [topicKey]: {
            [stateKey]: {
              ...INIT_TOPIC,
              ...topic,
              _loaded: ts
            }
          },
          [commentsKey]: {
            [stateKey]: {
              list: comments?.list || [],
              pagination: {
                page: 1,
                pageTotal: 1
              },
              _list: [],
              _loaded: ts
            }
          }
        })
        this.save(topicKey)
        this.save(commentsKey)
        return true
      }
    } catch (error) {}

    return false
  }

  /** 自动判断尽快帖子快照数据 */
  fetchTopicSnapshot = async (topicId: TopicId) => {
    let result = false
    if (!result) {
      if (DEV) console.info('fetchTopicSnapshot.oss', topicId)
      result = await this.fetchTopicFromOSS(topicId)
    }

    if (!result) {
      if (DEV) console.info('fetchTopicSnapshot.topic', topicId)
      const data = await this.fetchTopic({
        topicId
      })
      if (data.topic?._loaded && data.topic?.title) result = true
    }

    return result
  }

  /**
   * 电波提醒
   * @param {*} analysis 是否分析回复内容
   */
  fetchNotify = async (analysis: boolean = false) => {
    const raw = await fetchHTML({
      url: HTML_NOTIFY(),
      raw: true
    })

    let setCookie: string
    if (raw?.headers?.map?.['set-cookie']) setCookie = raw.headers.map['set-cookie']

    const html = HTMLTrim(await raw.text())
    const { _loaded } = this.notify
    let { unread, clearHref, list } = this.notify

    // 清除动作
    const clearHTML = html.match(
      /<a id="notify_ignore_all" href="(.+?)">\[知道了\]<\/a>/
    )
    if (clearHTML) clearHref = clearHTML[1]

    // 未读数
    const countHTML = html.match(/<span id="notify_count">(.+?)<\/span>/)
    if (countHTML) unread = parseInt(countHTML[1])

    // 回复内容
    if (analysis) {
      const listHTML = html.match(
        /<div id="comment_list">(.+?)<\/div><\/div><\/div><div id="footer"/
      )
      if (listHTML) list = cheerioNotify(listHTML[1])
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
    this.save(key)

    return {
      setCookie,
      html
    }
  }

  /** 小组信息 */
  fetchGroupInfo = async (args: { groupId: Id }) => {
    const { groupId = 0 } = args || {}
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
    this.save(key)

    return groupInfo
  }

  /** 小组帖子列表 */
  fetchGroup = async (args: { groupId: Id; page?: number }) => {
    const { groupId, page = 1 } = args || {}
    const html = await fetchHTML({
      url: HTML_GROUP(groupId, page)
    })

    const list = analysisGroup(html)
    const data = {
      list: list || [],
      _loaded: getTimestamp()
    }
    this.setState({
      group: {
        [`${groupId}|${page}`]: data
      }
    })

    return data
  }

  /** 条目帖子列表 */
  fetchBoard = async (args: { subjectId: SubjectId }) => {
    const { subjectId } = args || {}
    const key = 'board'
    const html = await fetchHTML({
      url: HTML_BOARD(subjectId)
    })

    const data = cheerioBoard(html)
    this.setState({
      [key]: {
        [subjectId]: {
          list: data || [],
          _loaded: getTimestamp()
        }
      }
    })

    return this.board(subjectId)
  }

  /** 条目影评列表 (日志) */
  fetchReviews = async (args: { subjectId: SubjectId }) => {
    const { subjectId } = args || {}
    const html = await fetchHTML({
      url: HTML_REVIEWS(subjectId)
    })

    const data = cheerioReviews(html)
    const key = 'reviews'
    this.setState({
      [key]: {
        [subjectId]: {
          list: data || [],
          _loaded: getTimestamp()
        }
      }
    })

    return this.reviews(subjectId)
  }

  /** 我的小组 */
  fetchMine = async () => {
    const html = await fetchHTML({
      url: HTML_GROUP_MINE()
    })
    const { list } = cheerioMine(html)

    const key = 'mine'
    this.setState({
      [key]: {
        list,
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }
    })
    this.save(key)

    return this[key]
  }

  /** 获取日志内容和留言 */
  fetchBlog = async (args: { blogId: Id }) => {
    const { blogId } = args || {}
    const HTML = await fetchHTML({
      url: HTML_BLOG(blogId)
    })
    const { blog, blogComments } = cheerioBlog(HTML)
    const _loaded = getTimestamp()

    // 缓存帖子内容
    const stateKey = blogId
    const blogKey = 'blog'
    this.setState({
      [blogKey]: {
        [stateKey]: {
          ...blog,
          _loaded
        }
      }
    })
    this.save(blogKey)

    // 缓存帖子回复
    const commentsKey = 'blogComments'
    this.setState({
      [commentsKey]: {
        [stateKey]: {
          list: blogComments,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _list: [],
          _loaded
        }
      }
    })

    return {
      blog,
      blogComments
    }
  }

  /** @deprecated 日志内容 (CDN) */
  fetchBlogFormCDN = () => {}

  /** CDN 获取用户历史超展开帖子 */
  fetchUserTopicsFormCDN = async (userId: UserId) => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_RAKUEN_USER_TOPICS(userId)
      })

      const data = {
        ...LIST_EMPTY,
        list: JSON.parse(_response).map(item => ({
          topicId: `group/${item.id}`,
          title: item.t,
          group: item.g,
          date: item.ti.split(' ')[0],
          time: item.ti.split(' ')[1],
          avatar: item.av,
          userId: item.uid,
          userName: item.un
        })),
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }

      const key = 'userTopicsFormCDN'
      this.setState({
        [key]: {
          [userId]: data
        }
      })
      return data
    } catch (error) {
      return {
        ...LIST_EMPTY,
        _loaded: getTimestamp()
      }
    }
  }

  /** 超展开热门数据 */
  fetchRakuenHot = async () => {
    const html = await fetchHTML({
      url: HTML_RAKUEN_HOT()
    })
    const list = cheerioHot(html)

    const key = 'hot'
    this.setState({
      [key]: {
        list,
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }
    })
    this.save(key)

    return this[key]
  }
}
