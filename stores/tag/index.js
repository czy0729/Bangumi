/*
 * 标签
 * @Author: czy0729
 * @Date: 2019-06-08 03:25:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-28 15:56:21
 */
import { observable } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { HTML_TAG, HTML_RANK, HTML_BROSWER } from '@constants/html'
import { NAMESPACE, DEFAULT_TYPE } from './init'
import { analysisTags } from './common'

class Tag extends store {
  state = observable({
    /**
     * 标签列表
     * @param {*} text    标签
     * @param {*} type
     * @param {*} airtime
     */
    tag: {
      _: (text = '', type = DEFAULT_TYPE, airtime = '') =>
        `${text.replace(/ /g, '+')}|${type}|${airtime}`,
      0: LIST_EMPTY // <INIT_TAG_ITEM>
    },

    /**
     * 排行榜
     * @param {*} type
     */
    rank: {
      _: (type = DEFAULT_TYPE) => type,
      0: LIST_EMPTY // <INIT_RANK_ITEM>
    },

    /**
     * 索引
     * @param {*} type
     * @param {*} airtime
     */
    browser: {
      _: (type = DEFAULT_TYPE, airtime = '') => `${type}|${airtime}`,
      0: LIST_EMPTY // <INIT_RANK_ITEM>
    }
  })

  init = () => this.readStorage(['tag', 'rank', 'browser'], NAMESPACE)

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
   * @param {*} refresh 是否刷新
   */
  fetchRank = async (
    { type = DEFAULT_TYPE, filter, airtime } = {},
    refresh
  ) => {
    const key = 'rank'
    const limit = 24
    const { list, pagination } = this.rank(type)
    const page = refresh ? 1 : pagination.page + 1

    const res = fetchHTML({
      url: HTML_RANK(type, 'rank', page, filter, airtime)
    })
    const raw = await res
    const { tag } = analysisTags(raw, page, pagination)

    const stateKey = type
    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? tag : [...list, ...tag],
          pagination: {
            page,
            pageTotal: tag.length === limit ? 1000 : page
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 索引
   * @param {*} param0
   * @param {*} refresh
   */
  fetchBrowser = async ({ type = DEFAULT_TYPE, airtime } = {}, refresh) => {
    const { list, pagination } = this.browser(type, airtime)
    let page // 下一页的页码
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_BROSWER(type, airtime, page)
    })
    const raw = await res
    const { pageTotal, tag } = analysisTags(raw, page, pagination)

    const key = 'browser'
    const stateKey = `${type}|${airtime}`
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
