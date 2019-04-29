/*
 * 超展开
 * @Author: czy0729
 * @Date: 2019-04-26 13:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-28 04:58:21
 */
import { observable, computed } from 'mobx'
import { date } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTMLTrim, HTMLToTree } from '@utils/html'
import { LIST_EMPTY } from '@constants'
import { HTML_RAKUEN } from '@constants/html'
import { MODEL_RAKUEN_SCOPE, MODEL_RAKUEN_TYPE } from '@constants/model'
import store from '@utils/store'

const initScope = MODEL_RAKUEN_SCOPE.getValue('全局聚合')
const initType = MODEL_RAKUEN_TYPE.getValue('全部')

class Rakuen extends store {
  state = observable({
    // 假缓存, 用于制造分页加载的效果
    _rakuen: {
      // `${scope}|${type}`: LIST_EMPTY
    },
    rakuen: {
      // `${scope}|${type}`: LIST_EMPTY
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('_rakuen'),
      this.getStorage('rakuen')
    ])
    const state = await res
    this.setState({
      _rakuen: state[0],
      rakuen: state[1]
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 超展开
   * @param {*} scope 范围
   * @param {*} type 类型
   */
  rakuen(scope = initScope, type = initType) {
    return computed(
      () => this.state.rakuen[`${scope}|${type}`] || LIST_EMPTY
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取超展开聚合列表 (高流量, 20k左右1次)
   * @issue 官网没有分页, 这接口居然一次返回250项
   * 为了提高体验, 做一个模拟分页加载效果
   */
  async fetchRakuen({ scope = initScope, type = initType } = {}, refresh) {
    let _rakuen
    let rakuen
    const stateKey = `${scope}|${type}`

    // 制造分页数据
    if (refresh) {
      const _key = '_rakuen'
      _rakuen = await _fetchRakuen({ scope, type })
      this.setState({
        [_key]: {
          [stateKey]: _rakuen
        }
      })
      this.setStorage(_key)

      rakuen = {
        ..._rakuen,
        list: _rakuen.list.slice(0, 20) // 第一页
      }
    } else {
      const { pagination } = this.rakuen(scope, type)
      const page = pagination.page + 1
      _rakuen = this.state._rakuen[stateKey] || LIST_EMPTY
      rakuen = {
        ..._rakuen,
        list: _rakuen.list.slice(0, page * 20), // 取下一页
        pagination: {
          page,
          pageTotal: pagination.pageTotal
        }
      }
    }

    // -------------------- 缓存 --------------------
    const key = 'rakuen'
    this.setState({
      [key]: {
        [stateKey]: rakuen
      }
    })
    this.setStorage(key)

    return Promise.resolve(rakuen)
  }

  // -------------------- action --------------------
}

export default new Rakuen()

async function _fetchRakuen({ scope, type } = {}) {
  // -------------------- 请求HTML --------------------
  const res = fetchHTML({
    url: HTML_RAKUEN(scope, type)
  })
  const raw = await res
  const HTML = HTMLTrim(raw).match(
    /<div id="eden_tpc_list"><ul>(.+?)<\/ul><\/div>/
  )

  // -------------------- 分析HTML --------------------
  const rakuen = []
  if (HTML) {
    const tree = HTMLToTree(HTML[1])
    tree.children.forEach(item => {
      const avatar = item.children[0].children[0].attrs.style.replace(
        /background-image:url\('|'\)/g,
        ''
      )

      const { children } = item.children[1]
      const title = children[0].text[0]
      const { href = '' } = children[0].attrs
      const replies = children[1].text[0]

      // 小组有可能是没有的
      let group = ''
      let groupHref = ''
      let time = ''
      if (children.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        time = children[2].children[0].text[0]
      } else {
        // eslint-disable-next-line prefer-destructuring
        group = children[3].text[0]
        groupHref = children[3].attrs.href
        time = children[4] ? children[4].text[0] : children[3].text[0]
      }

      const data = {
        title,
        avatar,
        href,
        replies,
        group,
        groupHref,
        time
      }
      rakuen.push(data)
    })
  }

  return Promise.resolve({
    list: rakuen,
    pagination: {
      page: 1,
      pageTotal: Math.ceil(rakuen.length / 20)
    },
    _loaded: date()
  })
}
