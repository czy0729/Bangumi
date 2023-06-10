/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:33:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-10 06:20:45
 */
import { getTimestamp, HTMLTrim, omit, queue } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { get } from '@utils/kv'
import {
  API_HOST,
  API_SUBJECT,
  API_SUBJECT_EP,
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
  LIMIT_LIST_COMMENTS
} from '@constants'
import { EpId, MonoId, PersonId, RatingStatus, SubjectId } from '@types'
import Computed from './computed'
import { getInt } from './utils'
import {
  DEFAULT_RATING_STATUS,
  INIT_MONO,
  INIT_SUBJECT_FROM_CDN_ITEM,
  INIT_SUBJECT_V2
} from './init'
import {
  fetchMono,
  cheerioSubjectFormHTML,
  cheerioMonoWorks,
  cheerioMonoVoices,
  cheerioRating,
  cheerioSubjectCatalogs,
  cheerioWikiEdits,
  cheerioWikiCovers,
  cheerioSubjectComments
} from './common'
import { ApiSubjectResponse, MonoWorks } from './types'

export default class Fetch extends Computed {
  /** 条目信息 */
  fetchSubject = async (
    subjectId: SubjectId,
    responseGroup: 'small' | 'medium' | 'large' = 'large'
  ): Promise<ApiSubjectResponse> => {
    const data = await this.fetch({
      url: API_SUBJECT(subjectId),
      data: {
        responseGroup
      },
      info: '条目信息'
    })
    const last = getInt(subjectId)
    const key = `subject${last}` as const

    // eps 只有在 large 的时候才是数组数据, 才能进行保存
    if (responseGroup === 'large') {
      this.setState({
        [key]: {
          [subjectId]: {
            ...this.subject(subjectId),
            ...data,

            // 章节数据可能会很巨大, 减少储存用不上的数据
            eps: (data?.eps || []).map((item: any) => {
              if (item.name_cn) item.name = ''
              return {
                ...item,
                // duration: '',
                desc: ''
              }
            }),
            _responseGroup: 'large',
            _loaded: getTimestamp()
          }
        }
      })
    } else {
      const _data = {
        ...this.subject(subjectId),
        ...omit(data, ['eps']),
        _responseGroup: responseGroup,
        _loaded: getTimestamp()
      }
      if (_data.eps && typeof _data.eps !== 'object') _data.eps = []

      this.setState({
        [key]: {
          [subjectId]: _data
        }
      })
    }

    this.save(key)
    return data
  }

  /** 网页获取条目信息 */
  fetchSubjectFromHTML = async (subjectId: SubjectId) => {
    const HTML = await fetchHTML({
      url: HTML_SUBJECT(subjectId)
    })

    const last = getInt(subjectId)
    const key = `subjectFormHTML${last}` as const
    const data = {
      ...cheerioSubjectFormHTML(HTML),
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [subjectId]: data
      }
    })

    this.save(key)
    return data
  }

  /** 新接口获取条目信息 */
  fetchSubjectV2 = async (subjectId: SubjectId) => {
    try {
      await this.initSubjectV2([subjectId])
      const data: any = await request(
        `${API_HOST}/v0/subjects/${subjectId}?responseGroup=small`
      )

      const key = `subjectV2${getInt(subjectId)}` as `subjectV2${number}`
      const now = getTimestamp()
      if (!data?.id) {
        this.setState({
          [key]: {
            [subjectId]: {
              ...INIT_SUBJECT_V2,
              _loaded: now
            }
          }
        })
        this.save(key)
        return false
      }

      this.setState({
        [key]: {
          [subjectId]: {
            id: data.id || '',
            date: data.date || '',
            image: data.images.medium || '',
            jp: data.name || '',
            cn: data.name_cn || '',
            tags: data.tags || [],
            rank: data?.rating?.rank || '',
            rating: {
              total: data?.rating?.total || '',
              score: data?.rating?.score || '',
              count: data?.rating?.count || {}
            },
            collection: data?.collection || {},
            eps: data.eps || '',
            vol: data.volumes || '',
            locked: data.locked || false,
            nsfw: data.nsfw || false,
            type: data.type || '',
            _loaded: now
          }
        }
      })
      this.save(key)
    } catch (error) {
      return false
    }

    return true
  }

  /** 装载云端条目缓存数据 */
  fetchSubjectFromOSS = async (subjectId: SubjectId) => {
    const now = getTimestamp()
    const subject = this.subject(subjectId)

    // 条目数据存在且比较新鲜, 不再请求, 应直接使用条目数据
    if (subject._loaded && now - Number(subject._loaded) <= 60 * 60 * 24) {
      return true
    }

    try {
      const data = await get(`subject_${subjectId}`)
      if (!data) return false

      const { ts, ...oss } = data
      if (typeof oss === 'object' && !Array.isArray(oss)) {
        const key = 'subjectFromOSS'
        this.setState({
          [key]: {
            [subjectId]: {
              rating: oss.rating,
              rank: oss.rank,
              type: oss.type,
              titleLabel: oss.titleLabel,
              _loaded: ts
            }
          }
        })
        this.save(key)
        return true
      }
    } catch (error) {}

    return false
  }

  /** CDN 获取条目信息 */
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
      ['subjectEp', subjectId]
    )
  }

  /** 从新 API 获取集数大于 1000 的条目的章节信息 */
  fetchSubjectEpV2 = async (subjectId: SubjectId) => {
    try {
      const data: any = await request(
        `${API_HOST}/v0/episodes?subject_id=${subjectId}&type=0&limit=100&offset=1000`
      )
      if (Array.isArray(data?.data) && data?.data?.length) {
        const key = 'epV2'
        this.setState({
          [key]: {
            [subjectId]: {
              list: data?.data.map(item => ({
                airdate: item.airdate,
                comment: item.comment,
                desc: '',
                duration: item.duration,
                id: item.id,
                name: item.name,
                name_cn: item.name_cn,
                sort: item.sort,
                status: item.name || item.name_cn ? 'Air' : 'NA',
                type: item.type,
                url: `http://bgm.tv/ep/${item.id}`
              })),
              _loaded: getTimestamp()
            }
          }
        })
        this.save(key)
        return this.epV2(subjectId)
      }
    } catch (ex) {}

    return false
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

    return this[key](subjectId)
  }

  /** 网页获取留言 */
  fetchSubjectComments = async (
    args: {
      subjectId: SubjectId
    },
    refresh: boolean = false,
    reverse: boolean = false
  ) => {
    const { subjectId } = args || {}
    const { list, pagination, _reverse } = this.subjectComments(subjectId)

    /** 下一页的页码 */
    let page: number

    // 倒序的实现逻辑: 默认第一次是顺序, 所以能拿到总页数
    // 倒序根据上次数据的总页数开始递减请求, 处理数据时再反转入库
    let isReverse = reverse
    if (!isReverse && !refresh) isReverse = _reverse

    if (isReverse) {
      // @issue 官网某些条目留言不知道为什么会多出一页空白
      page = refresh ? pagination.pageTotal - 1 : pagination.page - 1
    } else if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const html = await fetchHTML({
      url: HTML_SUBJECT_COMMENTS(subjectId, page)
    })

    const { pagination: _pagination, list: _list } = cheerioSubjectComments(html)
    if (isReverse) _list.reverse()

    const last = getInt(subjectId)
    const key = `subjectComments${last}` as const
    const data = {
      [subjectId]: {
        list: refresh ? _list : [...list, ..._list],
        pagination: _pagination,
        _loaded: getTimestamp(),
        _reverse: isReverse
      }
    }
    this.setState({
      [key]: data
    })
    this.save(key)

    return data
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
      this.save(monoKey)

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

    return this[key](subjectId, status, isFriend)
  }

  /** wiki 修订历史 */
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

  /** 获取条目分数值 */
  fetchRanks = async (subjectIds: SubjectId[]) => {
    const fetchs = []
    const state = {}
    const nsfw = {}
    const now = getTimestamp()
    subjectIds.forEach(subjectId => {
      const rank = this.rank(subjectId)
      if (!rank._loaded || now - Number(rank._loaded) >= 24 * 60 * 60) {
        fetchs.push(async () => {
          try {
            const data: any = await request(
              `${API_HOST}/v0/subjects/${subjectId}?responseGroup=small`
            )
            if (data?.rating) {
              state[subjectId] = {
                r: data.rating.rank || undefined,
                s: data.rating.score || undefined,
                _loaded: now
              }
            }
            if (data?.nsfw) nsfw[subjectId] = true
          } catch (error) {}

          return true
        })
      }
    })

    await queue(fetchs)
    const key = 'rank'
    const key2 = 'nsfw'
    this.setState({
      [key]: state,
      [key2]: nsfw
    })
    this.save(key)
    this.save(key2)

    return true
  }
}
