/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 20:07:13
 */
import { observable, computed } from 'mobx'
import CryptoJS from 'crypto-js'
import { getTimestamp, HTMLTrim, HTMLDecode } from '@utils'
import store from '@utils/store'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { put, read } from '@utils/db'
import {
  API_SUBJECT,
  API_SUBJECT_EP,
  APP_ID,
  CDN_MONO,
  CDN_SUBJECT,
  HTML_EP,
  HTML_MONO_VOICES,
  HTML_MONO_WORKS,
  HTML_SUBJECT,
  HTML_SUBJECT_CATALOGS,
  HTML_SUBJECT_COMMENTS,
  HTML_SUBJECT_RATING,
  HTML_SUBJECT_WIKI_COVER,
  HTML_SUBJECT_WIKI_EDIT,
  LIMIT_LIST_COMMENTS,
  LIST_EMPTY
} from '@constants'
import {
  EpId,
  HTMLText,
  MonoId,
  Origin,
  PersonId,
  RatingStatus,
  StoreConstructor,
  SubjectId
} from '@types'
import UserStore from '../user'
import {
  NAMESPACE,
  DEFAULT_RATING_STATUS,
  INIT_SUBJECT,
  INIT_SUBJECT_FROM_HTML_ITEM,
  INIT_SUBJECT_FROM_CDN_ITEM,
  INIT_MONO,
  INIT_MONO_WORKS,
  INIT_SUBJECT_WIKI
} from './init'
import {
  fetchMono,
  cheerioSubjectFormHTML,
  cheerioMonoWorks,
  cheerioMonoVoices,
  cheerioRating,
  cheerioSubjectCatalogs,
  cheerioWikiEdits,
  cheerioWikiCovers
} from './common'
import {
  Mono,
  MonoComments,
  MonoVoices,
  MonoWorks,
  Rating,
  Subject,
  SubjectCatalogs,
  SubjectComments,
  SubjectFormCDN,
  SubjectFormHTML,
  Wiki
} from './types'

/**
 * @update 2022/04/06 subject和subjectFormHTML根据id最后一位拆开10个key存放
 *         避免JSON.stringify后长度太长, 存(取)本地不能
 */
const state = {
  /** 条目 */
  subject0: {},
  subject1: {},
  subject2: {},
  subject3: {},
  subject4: {},
  subject5: {},
  subject6: {},
  subject7: {},
  subject8: {},
  subject9: {},

  /** 条目 (HTML) */
  subjectFormHTML0: {},
  subjectFormHTML1: {},
  subjectFormHTML2: {},
  subjectFormHTML3: {},
  subjectFormHTML4: {},
  subjectFormHTML5: {},
  subjectFormHTML6: {},
  subjectFormHTML7: {},
  subjectFormHTML8: {},
  subjectFormHTML9: {},

  /** 条目 (CDN) */
  subjectFormCDN: {
    0: INIT_SUBJECT_FROM_CDN_ITEM
  },

  /** @deprecated 条目章节 */
  subjectEp: {
    0: {}
  },

  /** 包含条目的目录 */
  subjectCatalogs: {
    0: LIST_EMPTY
  },

  /** 条目吐槽箱 */
  subjectComments: {
    0: LIST_EMPTY
  },

  /** 章节内容 */
  epFormHTML: {
    0: ''
  },

  /** 人物 */
  mono: {
    0: INIT_MONO
  },

  /** 人物吐槽箱 */
  monoComments: {
    0: LIST_EMPTY
  },

  /** 人物 (CDN) */
  monoFormCDN: {
    0: INIT_MONO
  },

  /** 人物作品 */
  monoWorks: {
    0: INIT_MONO_WORKS
  },

  /** 人物饰演的角色 */
  monoVoices: {
    0: INIT_MONO_WORKS
  },

  /** 好友评分列表 */
  rating: {
    0: {
      ...LIST_EMPTY,
      counts: {
        wishes: 0,
        collections: 0,
        doings: 0,
        on_hold: 0,
        dropped: 0
      }
    }
  },

  /** wiki修订历史 */
  wiki: {
    0: INIT_SUBJECT_WIKI
  },

  /** 自定义源头数据 */
  origin: {
    base: {},
    custom: {
      anime: [],
      hanime: [],
      manga: [],
      wenku: [],
      music: [],
      game: [],
      real: []
    }
  }
}

class SubjectStore
  extends store
  implements
    StoreConstructor<
      Omit<typeof state, `subject${number}` | `subjectFormHTML${number}`>
    >
{
  state = observable(state)

  // -------------------- get --------------------
  /** 条目, 合并 subject 0-9 */
  subject(subjectId: SubjectId) {
    return computed<Subject>(() => {
      if (!subjectId) return INIT_SUBJECT

      const str = String(subjectId)
      const last = str.charAt(str.length - 1)
      return this.state?.[`subject${last}`]?.[subjectId] || INIT_SUBJECT
    }).get()
  }

  /** 条目 (HTML), 合并 subject 0-9 */
  subjectFormHTML(subjectId: SubjectId) {
    return computed<SubjectFormHTML>(() => {
      if (!subjectId) return INIT_SUBJECT_FROM_HTML_ITEM

      const str = String(subjectId)
      const last = str.charAt(str.length - 1)
      return (
        this.state?.[`subjectFormHTML${last}`]?.[subjectId] ||
        INIT_SUBJECT_FROM_HTML_ITEM
      )
    }).get()
  }

  /** 条目 (CDN) */
  subjectFormCDN(subjectId: SubjectId) {
    return computed<SubjectFormCDN>(() => {
      return this.state.subjectFormCDN[subjectId] || INIT_SUBJECT_FROM_CDN_ITEM
    }).get()
  }

  /** @deprecated 条目章节 */
  subjectEp(subjectId: SubjectId) {
    return computed(() => {
      return this.state.subjectEp[subjectId] || {}
    }).get()
  }

  /** 包含条目的目录 */
  subjectCatalogs(subjectId: SubjectId) {
    return computed<SubjectCatalogs>(() => {
      return this.state.subjectCatalogs[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 条目吐槽箱 */
  subjectComments(subjectId: SubjectId) {
    return computed<SubjectComments>(() => {
      return this.state.subjectComments[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 章节内容 */
  epFormHTML(epId: EpId) {
    return computed<HTMLText>(() => {
      return this.state.epFormHTML[epId] || ''
    }).get()
  }

  /** 章节内容 */
  mono(monoId: MonoId) {
    return computed<Mono>(() => {
      return this.state.mono[monoId] || INIT_MONO
    }).get()
  }

  /** 人物吐槽箱 */
  monoComments(monoId: MonoId) {
    return computed<MonoComments>(() => {
      return this.state.monoComments[monoId] || LIST_EMPTY
    }).get()
  }

  /** 人物 (CDN), 用于人物首次渲染加速 */
  monoFormCDN(monoId: MonoId) {
    return computed<Mono>(() => {
      return this.state.monoFormCDN[monoId] || INIT_MONO
    }).get()
  }

  /** 人物作品 */
  monoWorks(monoId: MonoId) {
    return computed<MonoWorks>(() => {
      return this.state.monoWorks[monoId] || INIT_MONO_WORKS
    }).get()
  }

  /** 人物饰演的角色 */
  monoVoices(monoId: MonoId) {
    return computed<MonoVoices>(() => {
      return this.state.monoVoices[monoId] || INIT_MONO_WORKS
    }).get()
  }

  /** 好友评分列表 */
  rating(
    subjectId: SubjectId,
    status: RatingStatus = DEFAULT_RATING_STATUS,
    isFriend: boolean = false
  ) {
    return computed<Rating>(() => {
      const key = `${subjectId}|${status}|${isFriend}`
      return (
        this.state.rating[key] || {
          ...LIST_EMPTY,
          counts: {
            wishes: 0,
            collections: 0,
            doings: 0,
            on_hold: 0,
            dropped: 0
          }
        }
      )
    }).get()
  }

  /** wiki修订历史 */
  wiki(subjectId: SubjectId) {
    return computed<Wiki>(() => {
      return this.state.wiki[subjectId] || INIT_SUBJECT_WIKI
    }).get()
  }

  /** 自定义源头数据 */
  @computed get origin(): Origin {
    return this.state.origin
  }

  init = () => {
    return this.readStorage(
      [
        // subject 拆 store
        'subject0',
        'subject1',
        'subject2',
        'subject3',
        'subject4',
        'subject5',
        'subject6',
        'subject7',
        'subject8',
        'subject9',

        // subjectFormHTML 拆 store
        'subjectFormHTML0',
        'subjectFormHTML1',
        'subjectFormHTML2',
        'subjectFormHTML3',
        'subjectFormHTML4',
        'subjectFormHTML5',
        'subjectFormHTML6',
        'subjectFormHTML7',
        'subjectFormHTML8',
        'subjectFormHTML9',

        // other
        'subjectComments',
        'subjectCatalogs',
        // 'mono',
        // 'monoComments',
        'monoWorks',
        'monoVoices',
        'rating',
        'origin'
      ],
      NAMESPACE
    )
  }

  // -------------------- fetch --------------------
  /** 条目信息 */
  fetchSubject = (subjectId: SubjectId) => {
    const str = String(subjectId)
    const last = str.charAt(str.length - 1)
    return this.fetch(
      {
        url: API_SUBJECT(subjectId),
        data: {
          responseGroup: 'large'
        },
        info: '条目信息'
      },
      [`subject${last}`, subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )
  }

  /** 网页获取条目信息 */
  fetchSubjectFormHTML = async (subjectId: SubjectId) => {
    const HTML = await fetchHTML({
      url: HTML_SUBJECT(subjectId)
    })

    const str = String(subjectId)
    const last = str.charAt(str.length - 1)
    const key = `subjectFormHTML${last}`
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
    return data
  }

  /** CDN获取条目信息 */
  fetchSubjectFormCDN = async (subjectId: SubjectId) => {
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
      return data
    } catch (error) {
      return INIT_SUBJECT_FROM_CDN_ITEM
    }
  }

  /** @deprecated 章节数据 */
  fetchSubjectEp = (subjectId: SubjectId) => {
    return this.fetch(
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
  }

  /** 包含条目的目录 */
  fetchSubjectCatalogs = async (
    args: {
      subjectId: SubjectId
    },
    refresh?: boolean
  ) => {
    const { subjectId } = args || {}
    const key = 'subjectCatalogs'
    const limit = 15
    const { list, pagination } = this[key](subjectId)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_SUBJECT_CATALOGS(subjectId, page)
    })
    const { list: _list } = cheerioSubjectCatalogs(html)
    this.setState({
      [key]: {
        [subjectId]: {
          list: refresh ? _list : [...list, ..._list],
          pagination: {
            page,
            pageTotal: _list.length === limit ? 100 : page
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](subjectId)
  }

  /** 网页获取留言 */
  fetchSubjectComments = async (
    args: {
      subjectId: SubjectId
    },
    refresh?: boolean,
    reverse?: boolean
  ) => {
    const { subjectId } = args || {}
    const { list, pagination, _reverse } = this.subjectComments(subjectId)
    let page // 下一页的页码

    // @notice 倒序的实现逻辑: 默认第一次是顺序, 所以能拿到总页数
    // 点击倒序根据上次数据的总页数开始递减请求, 处理数据时再反转入库
    let isReverse = reverse
    if (!isReverse && !refresh) isReverse = _reverse

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
    const html = raw.replace(/ {2}|&nbsp;/g, ' ').replace(/\n/g, '')
    const commentsHTML = html.match(
      /<div id="comment_box">(.+?)<\/div><\/div><div class="section_line clear">/
    )

    // -------------------- 分析HTML --------------------
    // @todo 使用新的HTML解释函数重写
    const comments = []
    let { pageTotal = 0 } = pagination
    if (commentsHTML) {
      /**
       * 总页数
       *
       * [1] 超过10页的, 有总页数
       * [2] 少于10页的, 需要读取最后一个分页按钮获取页数
       * [3] 只有1页, 没有分页按钮
       */
      if (page === 1) {
        const pageHTML =
          html.match(/<span class="p_edge">\( \d+ \/ (\d+) \)<\/span>/) ||
          html.match(
            /<a href="\?page=(\d+)" class="p">10<\/a><a href="\?page=2" class="p">&rsaquo;&rsaquo;<\/a>/
          )
        if (pageHTML) {
          pageTotal = Number(pageHTML[1])
        } else {
          pageTotal = 1
        }
      }

      // 留言
      let items = commentsHTML[1].split('<div class="item clearit">')
      items.shift()

      if (isReverse) {
        items = items.reverse()
      }
      items.forEach((item, index) => {
        const userId = item.match(
          /<div class="text"><a href="\/user\/(.+?)" class="l">/
        )
        const userName = item.match(/" class="l">(.+?)<\/a> <small class="grey">/)
        const avatar = item.match(/background-image:url\('(.+?)'\)"><\/span>/)
        const time = item.match(/<small class="grey">@(.+?)<\/small>/)
        const star = item.match(/starlight stars(.+?)"/)
        const comment = item.match(/<p>(.+?)<\/p>/)
        comments.push({
          id: `${page}|${index}`,
          userId: userId ? userId[1] : '',
          userName: userName ? HTMLDecode(userName[1]) : '',
          avatar: avatar ? avatar[1] : '',
          time: time ? time[1].trim() : '',
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
            pageTotal: pageTotal
          },
          _loaded: getTimestamp(),
          _reverse: isReverse
        }
      }
    })

    this.setStorage(key, undefined, NAMESPACE)
    return res
  }

  /** 章节内容 */
  fetchEpFormHTML = async (epId: EpId) => {
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

  /** 人物信息和吐槽箱 (为了提高体验, 吐槽箱做模拟分页加载效果, 逻辑与超展开回复一致) */
  fetchMono = async (
    args: {
      monoId: MonoId
    },
    refresh?: boolean
  ) => {
    const { monoId } = args || {}

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

  /** CDN获取人物信息 */
  fetchMonoFormCDN = async (monoId: MonoId) => {
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
      return data
    } catch (error) {
      return INIT_MONO
    }
  }

  /** 人物作品 */
  fetchMonoWorks = async (
    args: {
      monoId: PersonId
      position?: string
      order?: 'date' | 'rank' | 'title'
    },
    refresh?: boolean
  ) => {
    const { monoId, position, order } = args || {}
    const key = 'monoWorks'
    const limit = 24
    const { list, pagination } = this[key](monoId)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_MONO_WORKS(monoId, position, order, page)
    })
    const { list: _list, filters } = cheerioMonoWorks(html)

    const data: MonoWorks = {
      list: refresh ? _list : [...list, ..._list],
      pagination: {
        page,
        pageTotal: _list.length === limit ? 100 : page
      },
      filters,
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [monoId]: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return data
  }

  /** 人物角色 */
  fetchMonoVoices = async (args: { monoId: PersonId; position?: string }) => {
    const { monoId, position } = args || {}
    const key = 'monoVoices'
    const html = await fetchHTML({
      url: HTML_MONO_VOICES(monoId, position)
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

  /** 所有人评分 */
  fetchRating = async (
    args: {
      subjectId: SubjectId
      status: RatingStatus
      isFriend?: boolean
    },
    refresh?: boolean
  ) => {
    const {
      subjectId = 0,
      status = DEFAULT_RATING_STATUS,
      isFriend = false
    } = args || {}

    const key = 'rating'
    const stateKey = `${subjectId}|${status}|${isFriend}`
    const limit = 20
    const { list, pagination } = this[key](subjectId, status, isFriend)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_SUBJECT_RATING(subjectId, status, isFriend, page)
    })
    const { list: _list, counts } = cheerioRating(html)
    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? _list : [...list, ..._list],
          pagination: {
            page,
            pageTotal: _list.length === limit ? 100 : page
          },
          counts,
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](subjectId, status, isFriend)
  }

  /** wiki修订历史 */
  fetchWiki = async (args: { subjectId: SubjectId }) => {
    const { subjectId } = args || {}
    const key = 'wiki'
    const htmlEdit = await fetchHTML({
      url: HTML_SUBJECT_WIKI_EDIT(subjectId)
    })
    const { list: edits } = cheerioWikiEdits(htmlEdit)

    const htmlCover = await fetchHTML({
      url: HTML_SUBJECT_WIKI_COVER(subjectId)
    })
    const { list: covers } = cheerioWikiCovers(htmlCover)

    this.setState({
      [key]: {
        [subjectId]: {
          edits,
          covers: covers.reverse(),
          _loaded: getTimestamp()
        }
      }
    })
    return this[key](subjectId)
  }

  // -------------------- page --------------------
  /** 更新源头数据 */
  updateOrigin = (data: Origin) => {
    const key = 'origin'
    this.setState({
      [key]: data
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 上传源头数据到云端 */
  uploadOrigin = () => {
    const { id } = UserStore.userInfo
    const { origin } = this.state
    return put({
      path: `origin/${id}.json`,
      content: CryptoJS.AES.encrypt(JSON.stringify(origin), APP_ID).toString()
    })
  }

  /** 恢复源头数据 */
  downloadOrigin = async () => {
    const { id } = UserStore.userInfo
    const { content } = await read({
      path: `origin/${id}.json`
    })

    if (!content) {
      return false
    }

    try {
      const bytes = CryptoJS.AES.decrypt(content.toString(), APP_ID)
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      if (typeof data?.base === 'object' && typeof data?.custom === 'object') {
        const key = 'origin'
        this.setState({
          [key]: {
            base: data.base,
            custom: data.custom
          }
        })
        this.setStorage(key, undefined, NAMESPACE)
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }
}

export default new SubjectStore()
