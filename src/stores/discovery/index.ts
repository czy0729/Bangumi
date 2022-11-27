/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:44:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-27 16:51:39
 */
import { observable, computed } from 'mobx'
import { cheerio, getTimestamp, HTMLDecode } from '@utils'
import store from '@utils/store'
import { fetchHTML, xhr, xhrCustom } from '@utils/fetch'
import { get } from '@utils/kv'
import {
  DEV,
  HOST,
  HOST_ANITAMA,
  HOST_NING_MOE,
  HTML_ACTION_CATALOG_ADD_RELATED,
  HTML_ACTION_CATALOG_CREATE,
  HTML_ACTION_CATALOG_DELETE,
  HTML_ACTION_CATALOG_EDIT,
  HTML_ACTION_CATALOG_MODIFY_SUBJECT,
  HTML_BLOG_LIST,
  HTML_CATALOG,
  HTML_CATALOG_DETAIL,
  HTML_CHANNEL,
  HTML_TAGS,
  HTML_WIKI,
  LIST_EMPTY
} from '@constants'
import { Id, StoreConstructor, SubjectId, SubjectType } from '@types'
import { LOG_INIT } from '../ds'
import {
  DEFAULT_TYPE,
  INIT_ANITAMA_TIMELINE_ITEM,
  INIT_BLOG_ITEM,
  INIT_CATALOG_ITEM,
  INIT_CATELOG_DETAIL_ITEM,
  INIT_CHANNEL,
  INIT_NINGMOE_DETAIL_ITEM,
  NAMESPACE
} from './init'
import {
  analysisCatalog,
  analysisCatalogDetail,
  analysisTags,
  cheerioBlog,
  cheerioChannel,
  cheerioWiki
} from './common'
import {
  Blog,
  Catalog,
  CatalogDetail,
  CatalogDetailFromOSS,
  Channel,
  News,
  Tags,
  Wiki
} from './types'

const state = {
  /** 目录 */
  catalog: {
    0: INIT_CATALOG_ITEM
  },

  /** 目录详情 */
  catalogDetail: {
    0: INIT_CATELOG_DETAIL_ITEM
  },

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS: {
    0: INIT_CATELOG_DETAIL_ITEM
  },

  /** 标签 */
  tags: {
    0: LIST_EMPTY
  },

  /** 全站日志 */
  blog: {
    0: INIT_BLOG_ITEM
  },

  /** 日志查看历史 */
  blogReaded: {
    0: false
  },

  /** 频道聚合 */
  channel: {
    0: INIT_CHANNEL,
    anime: INIT_CHANNEL,
    book: INIT_CHANNEL,
    game: INIT_CHANNEL,
    music: INIT_CHANNEL,
    real: INIT_CHANNEL
  },

  /** 在线人数 */
  online: 0,

  /** 维基人 */
  wiki: {
    counts: [],
    timeline: {
      all: [],
      lock: [],
      merge: [],
      crt: [],
      prsn: [],
      ep: [],
      relation: [],
      subjectPerson: [],
      subjectCrt: []
    },
    last: {
      all: [],
      anime: [],
      book: [],
      music: [],
      game: [],
      real: []
    }
  },

  /** 动漫之家资讯 */
  dmzjTimeline: {
    0: INIT_ANITAMA_TIMELINE_ITEM
  },

  /** 机核资讯 */
  gcoresTimeline: {
    0: INIT_ANITAMA_TIMELINE_ITEM
  },

  /** 和邪社资讯 */
  hexiesheTimeline: {
    0: INIT_ANITAMA_TIMELINE_ITEM
  },

  /** @deprecated 随机看看 */
  random: LIST_EMPTY,

  /** @deprecated 柠萌条目信息 */
  ningMoeDetail: {
    0: INIT_NINGMOE_DETAIL_ITEM
  },

  /** @deprecated Anitama 文章列表 */
  anitamaTimeline: {
    0: INIT_ANITAMA_TIMELINE_ITEM
  }
}

class DiscoveryStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  private _loaded = {
    blog: false,
    blogReaded: false,
    catalog: false,
    catalogDetail: false,
    catalogDetailFromOSS: false,
    channel: false,
    online: false,
    wiki: false
  }

  init = (key: keyof typeof this._loaded) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('DiscoveryStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: keyof typeof this._loaded) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 目录 */
  catalog(type: '' | 'collect' | 'me' = '', page: number = 1) {
    this.init('catalog')
    return computed<Catalog>(() => {
      const key = `${type}|${page}`
      return this.state.catalog[key] || INIT_CATALOG_ITEM
    }).get()
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    this.init('catalogDetail')
    return computed<CatalogDetail>(() => {
      return this.state.catalogDetail[id] || INIT_CATELOG_DETAIL_ITEM
    }).get()
  }

  /** 目录详情 (云缓存) */
  catalogDetailFromOSS(id: Id) {
    this.init('catalogDetailFromOSS')
    return computed<CatalogDetailFromOSS>(() => {
      return this.state.catalogDetailFromOSS[id] || INIT_CATELOG_DETAIL_ITEM
    }).get()
  }

  /** 标签 */
  tags(type: SubjectType, filter?: string) {
    return computed<Tags>(() => {
      const key = `${type}|${filter}`
      return this.state.tags[key] || LIST_EMPTY
    }).get()
  }

  /** 全站日志 */
  blog(type: SubjectType | 'all' | '' = '', page: number = 1) {
    this.init('blog')
    return computed<Blog>(() => {
      const key = `${type}|${page}`
      return this.state.blog[key] || INIT_BLOG_ITEM
    }).get()
  }

  /** 日志查看历史 */
  blogReaded(blogId: Id) {
    this.init('blogReaded')
    return computed<boolean>(() => {
      return this.state.blogReaded[blogId] || false
    }).get()
  }

  /** 频道聚合 */
  channel(type: SubjectType = 'anime') {
    this.init('channel')
    return computed<Channel>(() => {
      return this.state.channel[type] || INIT_CHANNEL
    }).get()
  }

  /** 在线人数 */
  @computed get online() {
    this.init('online')
    return this.state.online
  }

  /** 维基人 */
  @computed get wiki(): Wiki {
    this.init('wiki')
    return this.state.wiki
  }

  /** 动漫之家资讯 */
  dmzjTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.dmzjTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** 机核资讯 */
  gcoresTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.gcoresTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** 机核资讯 */
  hexiesheTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.hexiesheTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  /** @deprecated 随机看看 */
  @computed get random() {
    return this.state.random
  }

  /** @deprecated 柠萌条目信息 */
  ningMoeDetail(subjectId: SubjectId) {
    return computed<typeof INIT_NINGMOE_DETAIL_ITEM>(() => {
      return this.state.ningMoeDetail[subjectId] || INIT_NINGMOE_DETAIL_ITEM
    }).get()
  }

  /** @deprecated Anitama 文章列表 */
  anitamaTimeline(page: number = 1) {
    return computed<News>(() => {
      return this.state.anitamaTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
    }).get()
  }

  // -------------------- fetch --------------------
  /** 动漫之家资讯 */
  fetchDMZJTimeline = async (page: number = 1) => {
    const url = 'https://m.news.dmzj.com'
    let data: any = INIT_ANITAMA_TIMELINE_ITEM
    try {
      const { _response } = await xhrCustom({
        method: 'POST',
        url,
        headers: {
          referer: url,
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          page: page + 1
        }
      })
      console.info(_response)

      const key = 'dmzjTimeline'
      data = {
        list: JSON.parse(_response).map(item => ({
          aid: item.id,
          url: `${url}/article/${item.id}.html`,
          author: item.authorName,
          origin: '动漫之家',
          cover: {
            url: `https:${item.rowPicUrl}`,
            headers: {
              Referer: url
            }
          },
          title: item.title,
          intro: item.intro,
          subtitle: item.c_create_time
        })),
        _loaded: getTimestamp()
      }

      this.setState({
        [key]: {
          [page]: data
        }
      })
    } catch (error) {}

    return data
  }

  /** 机核资讯 */
  fetchGCORESTimeline = async (page: number = 1) => {
    let data: any = INIT_ANITAMA_TIMELINE_ITEM
    try {
      const { _response } = await xhrCustom({
        url: `https://www.gcores.com/gapi/v1/originals?page[limit]=12&page[offset]=${
          (page - 1) * 12
          // eslint-disable-next-line max-len
        }&sort=-published-at&include=category,user&filter[is-news]=1&filter[list-all]=0&fields[articles]=title,desc,is-published,thumb,app-cover,cover,comments-count,likes-count,bookmarks-count,is-verified,published-at,option-is-official,option-is-focus-showcase,duration,category,user`,
        headers: {
          referer: 'https://www.gcores.com/news',
          'content-type': 'application/vnd.api+json'
        }
      })

      const key = 'gcoresTimeline'
      data = {
        list: JSON.parse(_response).data.map(({ id, attributes }) => ({
          aid: id,
          url: `https://www.gcores.com/articles/${id}`,
          origin: '机核GCORES',
          cover: {
            url: `https://image.gcores.com/${attributes.thumb}?x-oss-process=image/resize,limit_1,m_lfit,w_1600/quality,q_90`,
            headers: {
              Referer: 'https://www.gcores.com/'
            }
          },
          title: attributes.title,
          subtitle: attributes['published-at'].slice(0, 16).replace('T', ' ')
        })),
        _loaded: getTimestamp()
      }

      this.setState({
        [key]: {
          [page]: data
        }
      })
    } catch (error) {
      console.info(error)
    }

    return data
  }

  /** 动漫之家资讯 */
  fetchHeXieSheTimeline = async (page: number = 1) => {
    const url =
      'https://www.hexieshe.cn/wp-admin/admin-ajax.php?action=zrz_load_more_posts'
    let data: any = INIT_ANITAMA_TIMELINE_ITEM
    try {
      const { _response } = await xhrCustom({
        method: 'POST',
        url,
        headers: {
          referer: url,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          type: 'catL12',
          paged: page
        }
      })

      // @ts-ignore
      const $ = cheerio(JSON.parse(_response).msg)
      data = {
        list: $('.pos-r.cart-list')
          .map((index: number, element: any) => {
            const $li = cheerio(element)
            const $a = $li.find('.entry-title a')

            return {
              aid: $a.attr('href').match(/\d+/g)?.[0],
              url: $a.attr('href'),
              author: $li.find('.users').text().trim(),
              origin: '和邪社',
              cover: {
                url: $li
                  .find('.thumb-in')
                  .attr('style')
                  .replace(/background-image:url\('|'\)/g, '')
              },
              title: $a.text().trim().replace(/#038;/g, ''),
              intro: $li.find('.post-ex').text().trim().replace(/#038;/g, ''),
              subtitle: `${$li.find('.list-category').text().trim()} · ${
                $li.find('.timeago').text().trim().split(' ')[0]
              }`.replace(/#038;/g, '')
            }
          })
          .get(),
        _loaded: getTimestamp()
      }

      const key = 'hexiesheTimeline'
      this.setState({
        [key]: {
          [page]: data
        }
      })
    } catch (error) {
      console.info(error)
    }

    return data
  }

  /** 标签 */
  fetchTags = async (
    args: {
      type?: SubjectType
      filter?: string
    },
    refresh: boolean = false
  ) => {
    const { type = DEFAULT_TYPE, filter } = args || {}
    const { list, pagination } = this.tags(type, filter)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_TAGS(type, page, filter)
    })
    const data = analysisTags(html)

    const key = 'tags'
    const tags = {
      list: refresh ? data.list : [...list, ...data.list],
      pagination: {
        page,
        pageTotal: data.list.length >= 100 ? 100 : page
      },
      _loaded: getTimestamp()
    }

    this.setState({
      [key]: {
        [`${type}|${filter}`]: tags
      }
    })

    return tags
  }

  /** 目录 */
  fetchCatalog = async (args: { type?: string; page?: number }) => {
    const { type = '', page = 1 } = args || {}
    const html = await fetchHTML({
      url: HTML_CATALOG(type, page)
    })
    const data = analysisCatalog(html)

    const key = 'catalog'
    this.setState({
      [key]: {
        [`${type}|${page}`]: {
          list: data,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (args: { id?: Id }) => {
    const { id } = args || {}
    const html = await fetchHTML({
      url: HTML_CATALOG_DETAIL(id)
    })
    const data = analysisCatalogDetail(html)

    const key = 'catalogDetail'
    this.setState({
      [key]: {
        [id]: {
          ...data,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    return data
  }

  /** 下载预数据 */
  fetchCatalogDetailFromOSS = async (args: { id?: Id }) => {
    try {
      const { id } = args || {}
      const data = await get(`catalog_${id}`)
      if (!data) return false

      const key = 'catalogDetailFromOSS'
      this.setState({
        [key]: {
          [id]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
      this.save(key)

      return true
    } catch (error) {
      return false
    }
  }

  /** 全站日志 */
  fetchBlog = async (args: { type?: string; page?: number }) => {
    const { type = '', page = 1 } = args || {}
    const html = await fetchHTML({
      url: HTML_BLOG_LIST(type, page)
    })

    const list = cheerioBlog(html)
    const key = 'blog'
    this.setState({
      [key]: {
        [`${type}|${page}`]: {
          list,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    return list
  }

  /** 频道聚合 */
  fetchChannel = async (args: { type?: SubjectType }) => {
    const { type = 'anime' } = args || {}
    const html = await fetchHTML({
      url: HTML_CHANNEL(type)
    })

    const data = cheerioChannel(html)
    const key = 'channel'
    this.setState({
      [key]: {
        [type]: {
          ...data,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    return this.channel(type)
  }

  /** 在线人数 */
  fetchOnline = async () => {
    const html = await fetchHTML({
      url: HOST
    })

    const match = html.match(/<small class="grey rr">online: (\d+)<\/small>/)
    if (match && match[1]) {
      const key = 'online'
      this.setState({
        [key]: parseInt(match[1])
      })
      this.save(key)
    }

    return this.online
  }

  /** 维基人 */
  fetchWiki = async () => {
    const html = await fetchHTML({
      url: HTML_WIKI()
    })

    const data = cheerioWiki(html)
    const key = 'wiki'
    this.setState({
      [key]: {
        ...data,
        lastCounts: this[key].counts
      }
    })
    this.save(key)

    return this[key]
  }

  /** @deprecated 随便看看 */
  fetchRandom = async (refresh?: boolean) => {
    const url = `${HOST_NING_MOE}/api/get_random_bangumi`

    try {
      const { list, pagination } = this.random
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          current_list: refresh ? '[]' : `[${list.map(item => item.id).join()}]`
        })
      }).then(response => response.json())

      let random
      if (data.code === 200) {
        const nextList = data.data.map(({ classification: item }) => ({
          id: item.id,
          bgmId: item.bgm_id,
          cover: item.bangumi_cover,
          jp: HTMLDecode(item.en_name),
          cn: HTMLDecode(item.cn_name),
          desc: item.description,
          eps: item.eps,
          airDate: item.air_date
        }))

        const key = 'random'
        random = {
          list: refresh ? nextList : [...list, ...nextList],
          pagination: {
            page: pagination.page + 1,
            pageTotal: 100
          },
          _loaded: getTimestamp()
        }
        this.setState({
          [key]: random
        })
      }

      return random
    } catch (error) {
      return LIST_EMPTY
    }
  }

  /** @deprecated 搜索柠萌动漫信息 */
  fetchNingMoeDetailBySearch = async ({ keyword }: { keyword: string }) => {
    const url = `${HOST_NING_MOE}/api/search`

    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          bangumi_type: '',
          keyword,
          limit: 10,
          page: 1,
          token: null,
          type: 'anime'
        })
      }).then(response => response.json())

      let ningMoeDetail: any = INIT_NINGMOE_DETAIL_ITEM
      if (data.code === 200) {
        if (Array.isArray(data.data)) {
          const key = 'ningMoeDetail'
          const { id, bgm_id: bgmId } = data.data[0].classification
          ningMoeDetail = {
            id,
            bgmId
          }
          this.setState({
            [key]: {
              [bgmId]: ningMoeDetail
            }
          })
        }
      }

      return ningMoeDetail
    } catch (error) {
      return INIT_NINGMOE_DETAIL_ITEM
    }
  }

  /** @deprecated 查询柠萌动漫信息 */
  fetchNingMoeDetail = async ({ id, bgmId }: { id: Id; bgmId: SubjectId }) => {
    const url = `${HOST_NING_MOE}/api/get_bangumi`

    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          bangumi_id: id
        })
      }).then(response => response.json())

      let ningMoeDetail: any = INIT_NINGMOE_DETAIL_ITEM
      if (data.code === 200) {
        const key = 'ningMoeDetail'
        ningMoeDetail = {
          id,
          bgmId
        }
        this.setState({
          [key]: {
            [bgmId]: ningMoeDetail
          }
        })
      }

      return ningMoeDetail
    } catch (error) {
      return INIT_NINGMOE_DETAIL_ITEM
    }
  }

  /** @deprecated 查询真正的云盘地址 */
  fetchNingMoeRealYunUrl = async ({ url }: { url: string }) => {
    const _url = `${HOST_NING_MOE}/api/get_real_yun_url`

    try {
      const data = await fetch(_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          url
        })
      }).then(response => response.json())

      let ningMoeRealYunUrl = ''
      if (data.code === 200) {
        ningMoeRealYunUrl = data.data.yun_url
      }

      return ningMoeRealYunUrl
    } catch (error) {
      return ''
    }
  }

  /** @deprecated Anitama文章列表 */
  fetchAnitamaTimeline = async (page: number = 1) => {
    const url = `${HOST_ANITAMA}/timeline?pageNo=${page}`

    let animataTimeline: any = INIT_ANITAMA_TIMELINE_ITEM
    try {
      const data = await fetch(url).then(response => response.json())
      if (data.status === 200 && data.success) {
        const key = 'anitamaTimeline'
        animataTimeline = {
          list: data.data.page.list.filter(item => item.entryType === 'article'),
          _loaded: getTimestamp()
        }
        this.setState({
          [key]: {
            [page]: animataTimeline
          }
        })
      }
    } catch (error) {}

    return animataTimeline
  }

  // -------------------- methods --------------------
  /** 更新日志查看历史 */
  updateBlogReaded = (blogId: Id) => {
    const { blogReaded } = this.state
    this.setState({
      blogReaded: {
        ...blogReaded,
        [blogId]: true
      }
    })
  }

  // -------------------- action --------------------
  /** 新建目录 */
  doCatalogCreate = (
    args: {
      formhash: string
      title: string
      desc: string
    },
    success?: (response?: any, request?: any) => any
  ) => {
    const { formhash, title, desc } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_CREATE(),
        data: {
          formhash,
          title,
          desc,
          submit: '创建目录'
        }
      },
      success
    )
  }

  /** 删除目录 */
  doCatalogDelete = (
    args: {
      catalogId: Id
      formhash: string
    },
    success?: () => any
  ) => {
    const { catalogId, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_DELETE(catalogId),
        data: {
          formhash,
          submit: '我要删除这个目录'
        }
      },
      success
    )
  }

  /** 编辑目录 */
  doCatalogEdit = (
    args: {
      catalogId: Id
      formhash: string
      title: string
      desc: string
    },
    success?: () => any
  ) => {
    const { catalogId, formhash, title, desc } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_EDIT(catalogId),
        data: {
          formhash,
          title,
          desc,
          submit: '保存修改'
        }
      },
      success
    )
  }

  /** 目录添加条目 */
  doCatalogAddRelate = (
    args: {
      catalogId: Id
      subjectId: SubjectId
      formhash: string
      noConsole?: boolean
    },
    success?: () => any
  ) => {
    const { catalogId, subjectId, formhash, noConsole } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_ADD_RELATED(catalogId),
        data: {
          formhash,
          cat: '0',
          add_related: subjectId,
          submit: '添加条目关联'
        },
        noConsole
      },
      success
    )
  }

  /** 目录移除条目 */
  doCatalogDeleteRelate = (
    args: {
      erase: string
    },
    success?: () => any
  ) => {
    const { erase } = args || {}
    xhr(
      {
        url: `${HOST}${erase}&ajax=1`
      },
      success
    )
  }

  /** 目录修改条目 */
  doCatalogModifySubject = (
    args: {
      modify: string
      formhash: string
      content: string
      order: string
    },
    success?: () => any
  ) => {
    const { modify, formhash, content, order } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_MODIFY_SUBJECT(modify),
        data: {
          formhash,
          content,
          order,
          submit: '提交'
        }
      },
      success
    )
  }
}

export default new DiscoveryStore()
