/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-29 14:45:38
 */
import { observable } from 'mobx'
import { LIST_EMPTY, LIMIT_LIST_COMMENTS } from '@constants'
import { API_SUBJECT, API_SUBJECT_EP } from '@constants/api'
import { CDN_SUBJECT, CDN_MONO } from '@constants/cdn'
import {
  HTML_SUBJECT,
  HTML_SUBJECT_COMMENTS,
  HTML_EP,
  HTML_MONO_WORKS,
  HTML_MONO_VOICES
} from '@constants/html'
import { getTimestamp } from '@utils'
import { HTMLTrim, HTMLDecode } from '@utils/html'
import store from '@utils/store'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import {
  NAMESPACE,
  INIT_SUBJECT,
  INIT_SUBJECT_FROM_HTML_ITEM,
  INIT_SUBJECT_FROM_CDN_ITEM,
  INIT_MONO,
  INIT_MONO_WORKS
} from './init'
import {
  fetchMono,
  cheerioSubjectFormHTML,
  cheerioMonoWorks,
  cheerioMonoVoices
} from './common'

class Subject extends store {
  state = observable({
    /**
     * 条目
     * @param {*} subjectId
     */
    subject: {
      0: INIT_SUBJECT
    },

    /**
     * 条目HTML
     * @param {*} subjectId
     */
    subjectFormHTML: {
      0: INIT_SUBJECT_FROM_HTML_ITEM
    },

    /**
     * 条目CDN自维护数据
     * 用于条目首次渲染加速
     * @param {*} subjectId
     */
    subjectFormCDN: {
      0: INIT_SUBJECT_FROM_CDN_ITEM
    },

    /**
     * [待废弃] 条目章节
     * @param {*} subjectId
     */
    subjectEp: {
      0: {}
    },

    /**
     * 条目吐槽箱
     * @param {*} subjectId
     */
    subjectComments: {
      0: LIST_EMPTY
    },

    /**
     * 章节内容
     * @param {*} epId
     */
    epFormHTML: {
      0: ''
    },

    /**
     * 人物
     * @param {*} monoId
     */
    mono: {
      0: INIT_MONO
    },

    /**
     * 人物吐槽箱
     * @param {*} monoId
     */
    monoComments: {
      0: LIST_EMPTY // <INIT_MONO_COMMENTS_ITEM>
    },

    /**
     * 人物CDN自维护数据
     * 用于人物首次渲染加速
     * @param {*} monoId
     */
    monoFormCDN: {
      0: INIT_MONO
    },

    /**
     * 人物作品
     * @param {*} monoId
     * https://bgm.tv/person/8138/works
     */
    monoWorks: {
      0: INIT_MONO_WORKS
    },

    /**
     * 人物角色列表
     * @param {*} monoId
     * https://bgm.tv/person/8138/works/voice
     */
    monoVoices: {
      0: INIT_MONO_WORKS
    }
  })

  init = () =>
    this.readStorage(
      [
        'subject',
        'subjectFormHTML',
        'subjectComments',
        'mono',
        'monoComments',
        'monoWorks',
        'monoVoices'
      ],
      NAMESPACE
    )

  // -------------------- fetch --------------------
  /**
   * 条目信息
   * @param {*} subjectId
   */
  fetchSubject = subjectId =>
    this.fetch(
      {
        url: API_SUBJECT(subjectId),
        data: {
          responseGroup: 'large'
        },
        info: '条目信息'
      },
      ['subject', subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 网页获取条目信息
   * @param {*} subjectId
   * @param {*} cdn 是否请求自建cdn
   */
  fetchSubjectFormHTML = async subjectId => {
    const HTML = await fetchHTML({
      url: HTML_SUBJECT(subjectId)
    })

    const key = 'subjectFormHTML'
    const data = {
      ...cheerioSubjectFormHTML(HTML),
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [subjectId]: data
      }
    })

    this.setStorage(key, undefined, NAMESPACE)
    return Promise.resolve(data)
  }

  /**
   * CDN获取条目信息
   * @param {*} subjectId
   */
  fetchSubjectFormCDN = async subjectId => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_SUBJECT(subjectId)
      })

      const data = {
        ...INIT_SUBJECT_FROM_CDN_ITEM,
        ...JSON.parse(_response)
      }
      const key = 'subjectFormCDN'
      this.setState({
        [key]: {
          [subjectId]: data
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      warn('subjectStore', 'fetchSubjectFormCDN', 404)
      return Promise.resolve(INIT_SUBJECT_FROM_CDN_ITEM)
    }
  }

  /**
   * 章节数据
   * @param {*} subjectId
   */
  fetchSubjectEp = subjectId =>
    this.fetch(
      {
        url: API_SUBJECT_EP(subjectId),
        info: '章节数据'
      },
      ['subjectEp', subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 网页获取留言
   * @param {*} subjectId
   * @param {*} refresh 是否重新获取
   * @param {*} reverse 是否倒序
   */
  fetchSubjectComments = async ({ subjectId }, refresh, reverse) => {
    const { list, pagination, _reverse } = this.subjectComments(subjectId)
    let page // 下一页的页码

    // @notice 倒序的实现逻辑: 默认第一次是顺序, 所以能拿到总页数
    // 点击倒序根据上次数据的总页数开始递减请求, 处理数据时再反转入库
    let isReverse = reverse
    if (!isReverse && !refresh) {
      isReverse = _reverse
    }

    if (isReverse) {
      if (refresh) {
        // @issue 官网某些条目留言不知道为什么会多出一页空白
        page = pagination.pageTotal - 1
      } else {
        page = pagination.page - 1
      }
    } else if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_SUBJECT_COMMENTS(subjectId, page)
    })
    const raw = await res
    const html = raw.replace(/\s+/g, '')
    const commentsHTML = html.match(
      /<divid="comment_box">(.+?)<\/div><\/div><divclass="section_lineclear">/
    )

    // -------------------- 分析HTML --------------------
    // @todo 使用新的HTML解释函数重写
    const comments = []
    let { pageTotal = 0 } = pagination
    if (commentsHTML) {
      /**
       * 总页数
       * @tucao 晕了, 至少有三种情况, 其实在第一页的时候获取就足够了
       * [1] 超过10页的, 有总页数
       * [2] 少于10页的, 需要读取最后一个分页按钮获取页数
       * [3] 只有1页, 没有分页按钮
       */
      if (page === 1) {
        const pageHTML =
          html.match(
            /<spanclass="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
          ) ||
          html.match(
            /<ahref="\?page=\d+"class="p">(\d+)<\/a><ahref="\?page=2"class="p">&rsaquo;&rsaquo;<\/a>/
          )
        if (pageHTML) {
          pageTotal = pageHTML[1]
        } else {
          pageTotal = 1
        }
      }

      // 留言
      let items = commentsHTML[1].split('<divclass="itemclearit">')
      items.shift()

      if (isReverse) {
        items = items.reverse()
      }
      items.forEach((item, index) => {
        const userId = item.match(
          /<divclass="text"><ahref="\/user\/(.+?)"class="l">/
        )
        const userName = item.match(/"class="l">(.+?)<\/a><smallclass="grey"/)
        const avatar = item.match(/background-image:url\('(.+?)'\)"><\/span>/)
        const time = item.match(/<smallclass="grey">@(.+?)<\/small>/)
        const star = item.match(/starlightstars(.+?)"/)
        const comment = item.match(/<p>(.+?)<\/p>/)
        comments.push({
          id: `${page}|${index}`,
          userId: userId ? userId[1] : '',
          userName: userName ? HTMLDecode(userName[1]) : '',
          avatar: avatar ? avatar[1] : '',
          time: time ? time[1] : '',
          star: star ? star[1] : '',
          comment: comment ? HTMLDecode(comment[1]) : ''
        })
      })
    }

    // -------------------- 缓存 --------------------
    const key = 'subjectComments'
    this.setState({
      [key]: {
        [subjectId]: {
          list: refresh ? comments : [...list, ...comments],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp(),
          _reverse: isReverse
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
    return res
  }

  /**
   * 章节内容
   * @param {*} epId
   */
  fetchEpFormHTML = async epId => {
    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: `!${HTML_EP(epId)}`
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    const contentHTML = HTML.match(/<div class="epDesc">(.+?)<\/div>/)
    if (contentHTML) {
      this.setState({
        epFormHTML: {
          [epId]: contentHTML[0]
        }
      })
    }

    return res
  }

  /**
   * 人物信息和吐槽箱
   * 为了提高体验, 吐槽箱做模拟分页加载效果, 逻辑与超展开回复一致
   * @param {*} monoId
   */
  fetchMono = async ({ monoId }, refresh) => {
    let res
    const monoKey = 'mono'
    const commentsKey = 'monoComments'
    const stateKey = monoId

    if (refresh) {
      // 重新请求
      res = fetchMono({ monoId })
      const { mono, monoComments } = await res
      const _loaded = getTimestamp()

      // 缓存人物信息
      this.setState({
        [monoKey]: {
          [stateKey]: {
            ...mono,
            _loaded
          }
        }
      })
      this.setStorage(monoKey, undefined, NAMESPACE)

      // 缓存吐槽箱
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            list: monoComments.slice(0, LIMIT_LIST_COMMENTS),
            pagination: {
              page: 1,
              pageTotal: Math.ceil(monoComments.length / LIMIT_LIST_COMMENTS)
            },
            _list: monoComments,
            _loaded
          }
        }
      })
      this.setStorage(commentsKey, undefined, NAMESPACE)
    } else {
      // 加载下一页留言
      const monoComments = this.monoComments(monoId)
      const page = monoComments.pagination.page + 1
      this.setState({
        [commentsKey]: {
          [stateKey]: {
            ...monoComments,
            list: monoComments._list.slice(0, LIMIT_LIST_COMMENTS * page),
            pagination: {
              ...monoComments.pagination,
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
   * CDN获取人物信息
   * @param {*} subjectId
   */
  fetchMonoFormCDN = async monoId => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_MONO(
          monoId.replace(/character\/|person\//g, ''),
          monoId.includes('character') ? 'data' : 'person'
        )
      })

      const data = {
        ...INIT_MONO,
        ...JSON.parse(_response)
      }
      const key = 'monoFormCDN'
      this.setState({
        [key]: {
          [monoId]: data
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      warn('subjectStore', 'fetchMonoFormCDN', 404)
      return Promise.resolve(INIT_MONO)
    }
  }

  /**
   * 人物作品
   */
  fetchMonoWorks = async ({ monoId, position, order } = {}, refresh) => {
    const key = 'monoWorks'
    const limit = 24
    const { list, pagination } = this[key](monoId)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_MONO_WORKS(monoId, position, order, page)
    })
    const { list: _list, filters } = cheerioMonoWorks(html)
    this.setState({
      [key]: {
        [monoId]: {
          list: refresh ? _list : [...list, ..._list],
          pagination: {
            page,
            pageTotal: _list.length === limit ? 100 : page
          },
          filters,
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](monoId)
  }

  /**
   * 人物角色
   */
  fetchMonoVoices = async ({ monoId, position, order } = {}) => {
    const key = 'monoVoices'
    const html = await fetchHTML({
      url: HTML_MONO_VOICES(monoId, position, order)
    })
    const { list, filters } = cheerioMonoVoices(html)
    this.setState({
      [key]: {
        [monoId]: {
          list,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          filters,
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](monoId)
  }
}

const Store = new Subject()
Store.setup()

export default Store
