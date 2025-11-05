/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:33:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 01:49:36
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
  DEV,
  HTML_EP,
  HTML_MONO,
  HTML_MONO_VOICES,
  HTML_MONO_WORKS,
  HTML_SUBJECT,
  HTML_SUBJECT_CATALOGS,
  HTML_SUBJECT_COMMENTS,
  HTML_SUBJECT_RATING,
  HTML_SUBJECT_STATS,
  HTML_SUBJECT_WIKI_COVER,
  HTML_SUBJECT_WIKI_EDIT
} from '@constants'
import { EpId, MonoId, PersonId, RatingStatus, ResponseV0Episodes, SubjectId } from '@types'
import timelineStore from '../timeline'
import {
  cheerioMAL,
  cheerioMono,
  cheerioMonoVoices,
  cheerioMonoWorks,
  cheerioRating,
  cheerioSubjectCatalogs,
  cheerioSubjectComments,
  cheerioSubjectFromHTML,
  cheerioVIB,
  cheerioWikiCovers,
  cheerioWikiEdits
} from './common'
import Computed from './computed'
import {
  DEFAULT_RATING_STATUS,
  INIT_MONO,
  INIT_SUBJECT_FROM_CDN_ITEM,
  INIT_SUBJECT_V2,
  STATE
} from './init'
import { getInt, mapV0Episodes } from './utils'
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
    const STATE_KEY = `subjectFormHTML${getInt(subjectId)}` as const
    const ITEM_KEY = subjectId

    try {
      const html = await fetchHTML({
        url: HTML_SUBJECT(subjectId)
      })
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            ...cheerioSubjectFromHTML(html),
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchSubjectFromHTML', error)
    }

    return this[STATE_KEY](ITEM_KEY)
  }

  /** 新接口获取条目信息 */
  fetchSubjectV2 = async (subjectId: SubjectId) => {
    try {
      await this.initSubjectV2([subjectId])
      const data: any = await request(`${API_HOST}/v0/subjects/${subjectId}?responseGroup=small`)

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

  /** @deprecated CDN 获取条目信息 */
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

  /** 自动判断尽快条目快照数据 */
  fetchSubjectSnapshot = async (subjectId: SubjectId) => {
    let result = false
    if (!result) {
      if (DEV) console.info('fetchSubjectSnapshot.oss', subjectId)
      result = await this.fetchSubjectFromOSS(subjectId)
    }

    if (!result) {
      if (DEV) console.info('fetchSubjectSnapshot.v2', subjectId)
      result = await this.fetchSubjectV2(subjectId)
    }

    if (!result) {
      if (DEV) console.info('fetchSubjectSnapshot.subject', subjectId)
      const data = await this.fetchSubject(subjectId)
      result = !!(data._loaded && data.name)
    }

    return result
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
    const url = (offset: number) =>
      `${API_HOST}/v0/episodes?subject_id=${subjectId}&type=0&limit=100&offset=${offset}`

    try {
      /** @todo 以后再优化 */
      const data1000: ResponseV0Episodes = await request(url(1000))
      if (Array.isArray(data1000?.data) && data1000?.data?.length) {
        let list = mapV0Episodes(data1000.data)

        const data1100: ResponseV0Episodes = await request(url(1100))
        if (Array.isArray(data1100?.data) && data1100?.data?.length) {
          list = [...list, ...mapV0Episodes(data1100.data)]

          const data1200: ResponseV0Episodes = await request(url(1200))
          if (Array.isArray(data1200?.data) && data1200?.data?.length) {
            list = [...list, ...mapV0Episodes(data1200.data)]
          }
        }

        const key = 'epV2'
        this.setState({
          [key]: {
            [subjectId]: {
              list,
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
    const next = cheerioSubjectCatalogs(html)

    this.setState({
      [key]: {
        [subjectId]: {
          list: refresh ? next.list : [...list, ...next.list],
          pagination: {
            page,
            pageTotal: next.list.length === limit ? 100 : page
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
      interest_type: '' | RatingStatus
      version: boolean
    },
    refresh: boolean = false,
    reverse: boolean = false
  ) => {
    const { subjectId, interest_type, version } = args || {}
    const { list, pagination, _reverse } = this.subjectComments(subjectId)

    /**
     * 倒序的实现逻辑: 默认第一次是顺序, 所以能拿到总页数
     * 倒序根据上次数据的总页数开始递减请求, 处理数据时再反转入库
     */
    let page: number
    let isReverse = reverse
    if (!isReverse && !refresh) isReverse = _reverse

    if (isReverse) {
      /** @issue 官网某些条目留言不知道为什么会多出一页空白 */
      page = refresh ? pagination.pageTotal - 1 : pagination.page - 1
    } else if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const html = await fetchHTML({
      url: HTML_SUBJECT_COMMENTS(subjectId, page, interest_type, version)
    })
    const { likes, version: hasVersion, ...next } = cheerioSubjectComments(html)
    timelineStore.updateLikes(likes)

    if (isReverse) next.list.reverse()
    const last = getInt(subjectId)
    const key = `subjectComments${last}` as const
    const data = {
      [subjectId]: {
        list: refresh ? next.list : [...list, ...next.list],
        pagination: next.pagination,
        version: hasVersion,
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

  /** 人物信息和吐槽箱 */
  fetchMono = async (args: { monoId: MonoId }) => {
    const { monoId } = args || {}
    const html = await fetchHTML({
      url: HTML_MONO(monoId)
    })
    const data = cheerioMono(html)
    const { mono, monoComments } = data

    const monoKey = 'mono'
    const commentsKey = 'monoComments'
    const stateKey = monoId
    const _loaded = getTimestamp()
    this.setState({
      [monoKey]: {
        [stateKey]: {
          ...mono,
          _loaded
        }
      },
      [commentsKey]: {
        [stateKey]: {
          list: monoComments,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded
        }
      }
    })
    this.save(monoKey)

    return data
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
    const next = cheerioMonoWorks(html)

    const data: MonoWorks = {
      list: refresh ? next.list : [...list, ...next.list],
      pagination: {
        page,
        pageTotal: next.list.length === limit ? 100 : page
      },
      filters: next.filters,
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
    const { subjectId = 0, status = DEFAULT_RATING_STATUS, isFriend = false } = args || {}

    const key = 'rating'
    const stateKey = `${subjectId}|${status}|${isFriend}`
    const limit = 20
    const { list, pagination } = this[key](subjectId, status, isFriend)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_SUBJECT_RATING(subjectId, status, isFriend, page)
    })
    const next = cheerioRating(html)

    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? next.list : [...list, ...next.list],
          pagination: {
            page,
            pageTotal: next.list.length === limit ? 100 : page
          },
          counts: next.counts,
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
    const edits = cheerioWikiEdits(htmlEdit)

    const htmlCover = await fetchHTML({
      url: HTML_SUBJECT_WIKI_COVER(subjectId)
    })
    const covers = cheerioWikiCovers(htmlCover)

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

  updateVIB = (subjectId: SubjectId, data: Partial<(typeof STATE.vib)[0]>) => {
    const key = 'vib'
    this.setState({
      [key]: {
        [subjectId]: {
          ...this.vib(subjectId),
          ...data
        }
      }
    })
    this.save(key)
  }

  /** VIB 等评分数据 */
  fetchVIB = async (subjectId: SubjectId) => {
    try {
      const html = await fetchHTML({
        url: HTML_SUBJECT_STATS(subjectId)
      })
      const data = cheerioVIB(html)
      this.updateVIB(subjectId, {
        ...data,
        _loaded: getTimestamp()
      })

      return true
    } catch (error) {}

    return false
  }

  /** https://greasyfork.org/zh-CN/scripts/31829-bangumi-anime-score-compare/code */
  fetchMAL = async (subjectId: SubjectId, keyword: string) => {
    try {
      const { _response } = await xhrCustom({
        url: `https://myanimelist.net/search/prefix.json?type=anime&keyword=${encodeURIComponent(
          keyword
        )}&v=1`
      })

      // #682
      let startDate = null
      const { items } = JSON.parse(_response).categories[0]
      let pageUrl = ''
      const date = this.date(subjectId)

      // #691
      if (date) {
        startDate = new Date(date)
        for (let i = 0; i < items.length; i += 1) {
          const item = items[i]
          let aired = null
          if (item.payload.aired.match('to')) {
            aired = parseDate(item.payload.aired.split('to')[0])
          } else {
            aired = parseDate(item.payload.aired)
          }

          // 选择第一个匹配日期的
          if (
            startDate.getFullYear() === aired.getFullYear() &&
            startDate.getMonth() === aired.getMonth()
          ) {
            pageUrl = item.url
            break
          }
        }
      } else if (items?.[0]) {
        pageUrl = items[0].url
      }
      if (!pageUrl) return false

      // #718
      const content = await fetchHTML({
        url: `!${pageUrl}`
      })
      const data = cheerioMAL(content)

      if (data.mal) {
        this.updateVIB(subjectId, {
          ...data,
          _loaded: getTimestamp()
        })
        return true
      }
    } catch (error) {}

    return false
  }

  /** https://greasyfork.org/zh-CN/scripts/31829-bangumi-anime-score-compare/code */
  fetchAniDB = async (subjectId: SubjectId, keyword: string) => {
    try {
      let query = (keyword || '').trim()
      if (!query) return false

      // #748
      // 标点符号不一致
      // 戦闘員、派遣します！ -> 戦闘員, 派遣します!
      query = query
        .replace(/、|！/, ' ')
        .replace(/\s{2,}/, ' ')
        .trim()

      const { _response } = await xhrCustom({
        url: `https://anidb.net/perl-bin/animedb.pl?show=json&action=search&type=anime&query=${encodeURIComponent(
          query
        )}`,
        headers: {
          referrer: 'https://anidb.net/',
          'content-type': 'application/json',
          'accept-language': 'en-US,en;q=0.9',
          'x-lcontrol': 'x-no-cache'
        }
      })

      // #765
      // [{"desc": "TV Series, 28 eps, 9.16 (414)", "hit": "葬送のフリーレン", "id": 17617, "link": "https://anidb.net/a17617", "name": "Sousou no Frieren"}]
      const info = JSON.parse(_response)
      if (info?.[0]?.desc) {
        const arr = info[0].desc.split(',')
        const data = {
          anidb: 0,
          anidbTotal: 0
        }
        if (arr && arr.length === 3) {
          const scoreStr = arr[2]
          if (!scoreStr.includes('N/A') && scoreStr.includes('(')) {
            const arr = scoreStr.split('(')
            data.anidb = Number(arr[0].trim())
            data.anidbTotal = Number(arr[1].replace(/\).*/g, ''))
          }

          if (data.anidb) {
            this.updateVIB(subjectId, {
              ...data,
              _loaded: getTimestamp()
            })
            return true
          }
        }
      }
    } catch (error) {}

    return false
  }
}

/**
 * 手动解析日期字符串并创建日期对象
 *  - Sep 29, 2023
 * */
function parseDate(str: string) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  }
  const parts = str.split(' ')
  const month = months[parts[0]]
  const day = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)
  return new Date(year, month, day)
}
