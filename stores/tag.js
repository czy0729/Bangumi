/*
 * 标签
 * @Author: czy0729
 * @Date: 2019-06-08 03:25:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-08 05:01:49
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_TAG } from '@constants/html'

const namespace = 'Tag'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')
const initTagItem = {
  id: '',
  cover: '',
  name: '',
  nameCn: '',
  tip: '',
  score: '',
  total: '',
  rank: '',
  collected: false
}

class Tag extends store {
  state = observable({
    tag: {
      // [`${text}|${type}`]: LIST_EMPTY | initTagItem
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('tag', namespace)])
    const state = await res
    this.setState({
      tag: state[0] || {}
    })
    return res
  }

  // -------------------- get --------------------
  /**
   * 取标签结果
   * @param {*} text 标签
   */
  tag(text = '', type = defaultType) {
    const _text = text.replace(/ /g, '+')
    return computed(
      () => this.state.tag[`${_text}|${type}`] || LIST_EMPTY
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * 标签结果
   * @param {*} text 关键字
   * @param {*} type 类型
   * @param {*} refresh 是否刷新
   */
  async fetchTag({ text = '', type = defaultType, order } = {}, refresh) {
    const _text = text.replace(/ /g, '+')

    const { list, pagination } = this.tag(_text, type)
    let page // 下一页的页码
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: HTML_TAG(_text, type, order, page)
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    let node
    const tag = []
    let { pageTotal = 0 } = pagination

    // 条目
    const matchHTML = HTML.match(
      /<ul id="browserItemList" class="browserFull">(.+?)<\/ul> <div class="clearit">/
    )
    if (matchHTML) {
      // 总页数
      if (page === 1) {
        const pageHTML =
          HTML.match(
            /<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
          ) ||
          HTML.match(
            /<a href="\?.*page=\d+" class="p">(\d+)<\/a><a href="\?.*page=2" class="p">&rsaquo;&rsaquo;<\/a>/
          )
        if (pageHTML) {
          // eslint-disable-next-line prefer-destructuring
          pageTotal = pageHTML[1]
        } else {
          pageTotal = 1
        }
      }

      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        // 条目Id
        node = findTreeNode(children, 'a|href')
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

        // 收藏状态
        node = findTreeNode(children, 'div > div > p > a|title=修改收藏')
        const collected = !!node

        const data = {
          ...initTagItem,
          id,
          cover,
          name,
          nameCn,
          tip,
          score,
          total,
          rank,
          collected
        }
        tag.push(data)
      })
    }

    const key = 'tag'
    const stateKey = `${_text}|${type}`
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
    this.setStorage(key, undefined, namespace)

    return res
  }
}

export default new Tag()
