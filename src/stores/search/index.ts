/*
 * @Author: czy0729
 * @Date: 2019-05-14 22:06:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-27 16:53:11
 */
import { observable, computed } from 'mobx'
import Constants from 'expo-constants'
import { getTimestamp, HTMLTrim, HTMLToTree, findTreeNode } from '@utils'
import store from '@utils/store'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { LIST_EMPTY, HTML_SEARCH, HTML_RAKUEN_SEARCH, DEV } from '@constants'
import { SearchCat, StoreConstructor } from '@types'
import { LOG_INIT } from '../ds'
import { NAMESPACE, DEFAULT_CAT, INIT_SEARCH_ITEM } from './init'
import { cheerioSearchRakuen } from './common'
import { Search } from './types'

const state = {
  /** 搜索 */
  search: {
    0: LIST_EMPTY
  },

  /** @deprecated 超展开搜索 */
  searchRakuen: {
    0: LIST_EMPTY
  }
}

class SearchStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  UA = ''

  private _loaded = {
    search: false
  }

  init = (key: keyof typeof this._loaded) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('SearchStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: keyof typeof this._loaded) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 搜索结果 */
  search(text: string, cat: SearchCat = DEFAULT_CAT, legacy?: any) {
    this.init('search')
    return computed<Search>(() => {
      const _text = text.replace(/ /g, '+')
      let key = `${_text}|${cat}`
      if (legacy) key += '|legacy'
      return this.state.search[key] || LIST_EMPTY
    }).get()
  }

  /** @deprecated 超展开搜索 */
  searchRakuen(q: string) {
    return computed(() => {
      return this.state.searchRakuen[q] || LIST_EMPTY
    }).get()
  }

  // -------------------- fetch --------------------
  /** 搜索 */
  fetchSearch = async (
    args: {
      text: string
      cat?: SearchCat

      /** legacy  1 为精准匹配 */
      legacy?: any
    },
    refresh?: boolean
  ) => {
    const { text = '', cat = DEFAULT_CAT, legacy = '' } = args || {}
    const _text = text.replace(/ /g, '+')
    const { list, pagination } = this.search(_text, cat, legacy)
    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    const raw = await fetchHTML({
      url: HTML_SEARCH(_text, cat, page, legacy),
      cookie: `; chii_searchDateLine=${getTimestamp() - 60};` // 搜索不加这个会无条件返回错误
    })
    const HTML = HTMLTrim(raw)
    if (HTML.includes('秒内只能进行一次搜索')) return Promise.reject()

    // -------------------- 分析HTML --------------------
    const search = []
    let node
    let { pageTotal = 0 } = pagination
    let searchHTML

    // 条目
    if (cat.includes('subject')) {
      searchHTML = HTML.match(
        /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div id="multipage"/
      )
      if (searchHTML) {
        // 总页数
        if (page === 1) {
          // case1: <span class="p_edge">(&nbsp;1&nbsp;/&nbsp;23&nbsp;)</span>
          // case2: <a href="/subject_search/love+live?cat=2&page=2" class="p">2</a><a href="/subject_search/love+live?cat=2&page=2" class="p">&rsaquo;&rsaquo;</a>
          const pageHTML =
            HTML.match(
              /<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
            ) ||
            HTML.match(
              /<a href=".+?&page=\d+" class="p">(\d+)<\/a><a href=".+?&page=2" class="p">&rsaquo;&rsaquo;<\/a>/
            )
          pageTotal = pageHTML ? pageHTML[1] : 1
        }

        const tree = HTMLToTree(searchHTML[1])
        tree.children.forEach(item => {
          const { children } = item

          // 条目Id
          node = findTreeNode(children, 'a|href~/subject/')
          const id = node ? node[0].attrs.href : ''

          // 封面
          node =
            findTreeNode(children, 'a > span > img') ||
            findTreeNode(children, 'a > noscript > img')
          let cover = node ? node[0].attrs.src : ''
          if (cover === '/img/info_only.png') {
            cover = ''
          }

          // 标题
          node = findTreeNode(children, 'div > h3 > small')
          const name = node ? node[0].text[0] : ''

          node = findTreeNode(children, 'div > h3 > a')
          const nameCn = node ? node[0].text[0] : ''

          // 描述
          node = findTreeNode(children, 'div > p|class=info tip')
          const tip = node ? node[0].text[0] : ''

          // 分数
          node = findTreeNode(children, 'div > p > small|class=fade')
          const score = node ? node[0].text[0] : ''

          node = findTreeNode(children, 'div > p > span|class=tip_j')
          const total = node ? node[0].text[0] : ''

          // 排名
          node = findTreeNode(children, 'div > span|class=rank')
          const rank = node ? node[0].text[0] : ''

          // 类型
          node = findTreeNode(children, 'div > h3 > span|class')
          const type = node
            ? node[0].attrs.class.replace(/ico_subject_type subject_type_| ll/g, '')
            : ''

          // 收藏状态
          node = findTreeNode(children, 'div > div > p > a|title=修改收藏')
          const collected = !!node

          const data = {
            ...INIT_SEARCH_ITEM,
            id,
            cover,
            name,
            nameCn,
            tip,
            score,
            total,
            rank,
            type,
            collected
          }
          search.push(data)
        })
      }
    }

    // 人物
    if (cat.includes('mono')) {
      searchHTML = HTML.match(
        /<div id="columnSearchB" class="column">(.+?)<div id="columnSearchC"/
      ) // 游戏

      if (searchHTML) {
        // 人物页面没有分页信息, 但是还是能请求到下一页
        pageTotal = 100

        const tree = HTMLToTree(searchHTML[1])
        const items = findTreeNode(tree.children, 'div|class=light_odd clearit')
        items.forEach(item => {
          const { children } = item

          // 人物Id
          node = findTreeNode(children, 'a|class=avatar')
          const id = node ? node[0].attrs.href : ''

          // 封面
          node =
            findTreeNode(children, 'a > img') ||
            findTreeNode(children, 'a > noscript > img')
          let cover = node ? node[0].attrs.src : ''
          if (cover === '/img/info_only.png') {
            cover = ''
          }

          // 标题
          node = findTreeNode(children, 'div > h2 > a')
          const name = node ? (node[0].text[0] || '').replace(' / ', '') : ''

          node = findTreeNode(children, 'div > h2 > a > span')
          const nameCn = node ? node[0].text[0] : ''

          // 描述
          node = findTreeNode(children, 'div > div > span')
          const tip = node ? (node[0].text[0] || '').replace(' ', '') : ''

          // 讨论数
          node = findTreeNode(children, 'div > small')
          const comments = node ? node[0].text[0] : ''

          const data = {
            ...INIT_SEARCH_ITEM,
            id,
            cover,
            name,
            nameCn,
            tip,
            comments
          }
          search.push(data)
        })
      }
    }

    const key = 'search'
    let stateKey = `${_text}|${cat}`
    if (legacy) stateKey += '|legacy'

    const data = {
      list: refresh ? search : [...list, ...search],
      pagination: {
        page,
        pageTotal: Number(pageTotal)
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })
    this.save(key)

    return data
  }

  /** @deprecated 超展开搜索 */
  fetchSearchRakuen = async (args: { q: string }, refresh?: boolean) => {
    const { q } = args || {}

    try {
      const key = 'searchRakuen'
      const limit = 10 // ?有时1页是10个有时是11个
      const { list, pagination } = this[key](q)
      const page = refresh ? 1 : pagination.page + 1

      if (!this.UA) this.UA = await Constants.getWebViewUserAgentAsync()
      const { _response } = await xhrCustom({
        url: HTML_RAKUEN_SEARCH(q, page),
        headers: {
          Host: 'search.gitee.com',
          'User-Agent':
            this.UA ||
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36'
        }
      })

      const { list: _list, pageTotal } = cheerioSearchRakuen(_response)
      this.setState({
        [key]: {
          [q]: {
            list: refresh ? _list : [...list, ..._list],
            pagination: {
              page,
              pageTotal: _list.length >= limit ? pageTotal : page
            },
            _loaded: getTimestamp()
          }
        }
      })

      return this[key](q)
    } catch (error) {
      return {
        ...LIST_EMPTY,
        _loaded: getTimestamp()
      }
    }
  }
}

export default new SearchStore()
