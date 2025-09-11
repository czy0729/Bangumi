/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:47:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-08 20:57:51
 */
import { cheerio, feedback, getTimestamp } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { get } from '@utils/kv'
import {
  HOST,
  HOST_DMZJ,
  HTML_BLOG_LIST,
  HTML_CATALOG,
  HTML_CATALOG_DETAIL,
  HTML_CHANNEL,
  HTML_DOLLARS,
  HTML_TAGS,
  HTML_WIKI
} from '@constants'
import { Id, SubjectType } from '@types'
import {
  cheerioBlog,
  cheerioCatalog,
  cheerioCatalogDetail,
  cheerioChannel,
  cheerioDollars,
  cheerioTags,
  cheerioWiki
} from './common'
import Computed from './computed'
import { DEFAULT_TYPE, INIT_ANITAMA_TIMELINE_ITEM } from './init'
import { getInt } from './utils'
import { FetchBlogArgs, FetchCatalogArgs } from './types'

export default class Fetch extends Computed {
  /** 动漫之家资讯 */
  fetchDMZJTimeline = async (page: number = 1) => {
    const url = HOST_DMZJ
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
    const url = 'https://www.hexieshe.cn/wp-admin/admin-ajax.php?action=zrz_load_more_posts'
    let data: any = INIT_ANITAMA_TIMELINE_ITEM
    try {
      const { _response } = await xhrCustom({
        method: 'POST',
        url,
        headers: {
          referer: 'https://www.hexieshe.cn/',
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          type: 'catL12',
          paged: page
        }
      })

      const $ = cheerio(JSON.parse(_response).msg)
      data = {
        list: $('.pos-r.cart-list')
          .map((_index: number, element: any) => {
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
                  .replace(/background-image:url\('|'\)/g, ''),
                headers: {
                  Referer: 'https://www.hexieshe.cn/'
                }
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
    const data = cheerioTags(html)

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
  fetchCatalog = async (args: FetchCatalogArgs) => {
    const { type = '', page = 1 } = args || {}
    const STATE_KEY = 'catalog'
    const ITEM_ARGS = [type, page] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const html = await fetchHTML({
        url: HTML_CATALOG(type, page)
      })

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: cheerioCatalog(html),
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchCatalog', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    const STATE_KEY = 'catalogDetail'
    const ITEM_KEY = id

    try {
      const html = await fetchHTML({
        url: HTML_CATALOG_DETAIL(id)
      })

      const last = getInt(id)
      const FINAL_STATE_KEY = `catalogDetail${last}` as const
      this.setState({
        [FINAL_STATE_KEY]: {
          [ITEM_KEY]: {
            ...cheerioCatalogDetail(html),
            _loaded: getTimestamp()
          }
        }
      })
      this.save(FINAL_STATE_KEY)
    } catch (error) {
      this.error('fetchCatalogDetail', error)
    }

    return this[STATE_KEY](ITEM_KEY)
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
  fetchBlog = async (args: FetchBlogArgs) => {
    const { type = '', page = 1 } = args || {}

    const STATE_KEY = 'blog'
    const ITEM_ARGS = [type, page] as const
    const ITEM_KEY = ITEM_ARGS.join('|')

    try {
      const html = await fetchHTML({
        url: HTML_BLOG_LIST(type, page)
      })

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: cheerioBlog(html),
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchBlog', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
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

  /** DOLLARS */
  fetchDollars = async () => {
    const STATE_KEY = 'dollars'

    try {
      const html = await fetchHTML({
        url: HTML_DOLLARS()
      })

      this.setState({
        [STATE_KEY]: {
          ...cheerioDollars(html),
          _loaded: getTimestamp()
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchDollars', error)
    }

    return this[STATE_KEY]
  }

  /** 轮询更新 DOLLARS */
  updateDollars = async () => {
    const sinceId = String(this.dollars.list?.[0]?.id || 0).slice(0, 10)
    const html = await fetchHTML({
      url: `${HTML_DOLLARS()}?since_id=${sinceId}&_=${getTimestamp()}`
    })

    if (html !== 'null') {
      try {
        const items = JSON.parse(html)
        const key = 'dollars'
        this.setState({
          [key]: {
            ...this.state.dollars,
            list: [...items.reverse(), ...this.state.dollars.list].slice(0, 80),
            _loaded: getTimestamp()
          }
        })
        this.save(key)
        feedback(true)
        return true
      } catch (error) {}
    }

    return false
  }
}
