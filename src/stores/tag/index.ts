/*
 * 标签
 * @Author: czy0729
 * @Date: 2019-06-08 03:25:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 12:17:12
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { HTML_TAG, HTML_RANK, HTML_BROSWER } from '@constants/html'
import { BrowserSort } from '@constants/model/types'
import { NAMESPACE, DEFAULT_TYPE } from './init'
import { analysisTags, analysiRank } from './common'
import { FetchBrowser } from './types'

class Tag extends store {
  state = observable({
    /** 标签列表 */
    tag: {
      0: LIST_EMPTY
    },

    /**
     * 排行榜
     * @param {*} type
     */
    rank: {
      _: (type = DEFAULT_TYPE, page = 1, filter = '', airtime = '') =>
        `${type}|${page}|${filter}|${airtime}`,
      0: LIST_EMPTY // <INIT_RANK_ITEM>
    },

    /** 索引 */
    browser: {
      0: LIST_EMPTY
    }
  })

  init = () => this.readStorage(['tag', 'rank', 'browser'], NAMESPACE)

  // -------------------- get --------------------
  /**
   * 标签列表
   * @param {*} text    标签
   * @param {*} type
   * @param {*} airtime
   */
  tag(text = '', type = DEFAULT_TYPE, airtime = '') {
    return computed(() => {
      const key = `${text.replace(/ /g, '+')}|${type}|${airtime}`
      return this.state.tag[key] || LIST_EMPTY
    }).get()
  }

  /**
   * 索引
   * @param {*} type
   * @param {*} airtime
   * @param {*} sort
   */
  browser(type = DEFAULT_TYPE, airtime: any = '', sort: BrowserSort = '') {
    return computed(() => {
      const key = `${type}|${airtime}|${sort}`
      return this.state.browser[key] || LIST_EMPTY
    }).get()
  }

  // -------------------- fetch --------------------
  /**
   * 标签结果
   * @param {*} text 关键字
   * @param {*} type 类型
   * @param {*} order 排序
   * @param {*} refresh 是否刷新
   */
  fetchTag = async (
    { text = '', type = DEFAULT_TYPE, order, airtime = '' } = {},
    refresh
  ) => {
    const _text = text.replace(/ /g, '+')

    const { list, pagination } = this.tag(_text, type, airtime)
    let page // 下一页的页码
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_TAG(_text, type, order, page, airtime)
    })
    const raw = await res
    const { pageTotal, tag } = analysisTags(raw, page, pagination)

    const key = 'tag'
    const stateKey = `${_text}|${type}|${airtime}`
    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? tag : [...list, ...tag],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 排行榜 (与标签相似, 所以共用逻辑)
   * @param {*} type 类型
   * @param {*} filter 类型2
   * 动画: tv | web | ova | movie | misc
   * 书籍: comic | novel | illustration | misc
   * 音乐: [null]
   * 游戏: pc | mac | ps4 | xbox_one | ns | will_u | ps3 | xbox360
   * | wii | psv | 3ds | nds | psp | ps2 | xbox | ps | fc | gba | gb |
   * 三次元: jp | en | cn | misc
   *
   * @param {*} airtime 2020-1960
   */
  fetchRank = async ({
    type = DEFAULT_TYPE,
    filter = '',
    airtime = '',
    page = 1
  } = {}) => {
    const key = 'rank'
    const res = fetchHTML({
      url: HTML_RANK(type, 'rank', page, filter, airtime)
    })
    const raw = await res
    const list = analysiRank(raw)

    const stateKey = `${type}|${page}|${filter}|${airtime}`
    this.setState({
      [key]: {
        [stateKey]: {
          list,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 请求索引
   * @param {*} args
   * @param {*} refresh
   */
  fetchBrowser: FetchBrowser = async (
    { type = DEFAULT_TYPE, airtime, sort } = {},
    refresh
  ) => {
    const { list, pagination } = this.browser(type, airtime, sort)
    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_BROSWER(type, airtime, page, sort)
    })
    const raw = await res
    const { pageTotal, tag } = analysisTags(raw, page, pagination)

    const key = 'browser'
    const stateKey = `${type}|${airtime}|${sort}`
    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? tag : [...list, ...tag],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }
}

const Store = new Tag()
Store.setup()

export default Store
