/*
 * 时间表, 首页信息聚合
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-29 20:16:06
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import { HOST, LIST_EMPTY } from '@constants'
import { API_CALENDAR } from '@constants/api'

const namespace = 'Calendar'
const initHome = {
  anime: [],
  game: [],
  book: [],
  music: [],
  real: [],
  _loaded: false
}

class Calendar extends store {
  state = observable({
    calendar: LIST_EMPTY,
    home: initHome
  })

  async init() {
    const res = Promise.all([
      this.getStorage('calendar', namespace),
      this.getStorage('home', namespace)
    ])
    const state = await res
    this.setState({
      calendar: state[0] || LIST_EMPTY,
      home: state[1] || initHome
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 取每日放送
   */
  @computed get calendar() {
    return this.state.calendar
  }

  /**
   * 取首页信息聚合
   */
  @computed get home() {
    return this.state.home
  }

  // -------------------- fetch --------------------
  /**
   * 每日放送
   */
  fetchCalendar() {
    return this.fetch(
      {
        url: API_CALENDAR(),
        info: '每日放送'
      },
      'calendar',
      {
        list: true,
        storage: true,
        namespace
      }
    )
  }

  /**
   * 首页信息聚合
   */
  async fetchHome() {
    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: `!${HOST}`,
      cookie: 'chii_searchDateLine=0;' // 搜索不加这个会无条件返回错误
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    const itemsHTML = HTML.match(
      /<ul id="featuredItems" class="featuredItems">(.+?)<\/ul>/
    )
    if (itemsHTML) {
      const data = {
        anime: [],
        game: [],
        book: [],
        music: [],
        real: []
      }
      const type = ['anime', 'game', 'book', 'music', 'real']

      let node
      const tree = HTMLToTree(itemsHTML[1])
      log
      tree.children.forEach((item, index) => {
        const list = []

        item.children.forEach(({ children }, idx) => {
          // 第一个是标签栏, 排除掉
          if (idx === 0) {
            return
          }

          node =
            findTreeNode(children, 'a > div|style~background') ||
            findTreeNode(children, 'a|style~background')
          const cover = node
            ? node[0].attrs.style.replace(
                /background:#000 url\(|\) 50%|background-image:url\('|'\);/g,
                ''
              )
            : ''

          node = findTreeNode(children, 'a|href&title')
          const title = node ? node[0].attrs.title : ''
          const subjectId = node
            ? node[0].attrs.href.replace('/subject/', '')
            : ''

          node =
            findTreeNode(children, 'p > small') ||
            findTreeNode(children, 'div > small')
          const info = node ? node[0].text[0] : ''

          list.push({
            cover,
            title,
            subjectId,
            info
          })
        })

        data[type[index]] = list
      })

      const key = 'home'
      this.setState({
        [key]: {
          ...data,
          _loaded: getTimestamp()
        }
      })
      this.setStorage(key, undefined, namespace)
    }

    return res
  }
}

export default new Calendar()
