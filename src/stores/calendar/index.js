/*
 * 时间表, 首页信息聚合
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 20:30:47
 */
import { observable } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import { HOST, LIST_EMPTY } from '@constants'
import { API_CALENDAR } from '@constants/api'
import { CDN_ONAIR, CDN_DISCOVERY_HOME } from '@constants/cdn'
import { NAMESPACE, INIT_HOME } from './init'
import { cheerioToday } from './common'

class Calendar extends store {
  state = observable({
    /**
     * 每日放送
     */
    calendar: LIST_EMPTY,

    /**
     * 首页信息聚合
     */
    home: INIT_HOME,

    /**
     * 首页信息聚合 (CDN)
     */
    homeFromCDN: INIT_HOME,

    /**
     * ekibun的线上爬虫数据
     * @param {*} subjectId
     */
    onAir: {
      // [subjectId]: INIT_ONAIR_ITEM
    }
  })

  init = () =>
    this.readStorage(['calendar', 'home', 'homeFromCDN', 'onAir'], NAMESPACE)

  // -------------------- fetch --------------------
  /**
   * 每日放送
   */
  fetchCalendar = () =>
    this.fetch(
      {
        url: API_CALENDAR(),
        info: '每日放送'
      },
      'calendar',
      {
        list: true,
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 首页信息聚合
   */
  fetchHome = async () => {
    // -------------------- 请求HTML --------------------
    const res = fetchHTML({
      url: `!${HOST}`
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    const data = {
      anime: [],
      game: [],
      book: [],
      music: [],
      real: [],
      today: '今日上映 - 部。共 - 人收看今日番组。'
    }
    const itemsHTML = HTML.match(
      /<ul id="featuredItems" class="featuredItems">(.+?)<\/ul>/
    )
    if (itemsHTML) {
      const type = ['anime', 'game', 'book', 'music', 'real']

      let node
      const tree = HTMLToTree(itemsHTML[1])
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
    }

    const todayHTML = HTML.match('<li class="tip">(.+?)</li>')
    if (todayHTML) {
      data.today = cheerioToday(`<li>${todayHTML[1]}</li>`)
    }

    const key = 'home'
    this.setState({
      [key]: {
        ...data,
        _loaded: getTimestamp()
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return res
  }

  /**
   * 首页信息聚合 (CDN)
   */
  fetchHomeFromCDN = async version => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_DISCOVERY_HOME(version)
      })

      const data = {
        ...INIT_HOME,
        ...JSON.parse(_response)
      }
      const key = 'homeFromCDN'
      this.setState({
        [key]: {
          ...data,
          _loaded: getTimestamp()
        }
      })

      this.setStorage(key, undefined, NAMESPACE)
      return Promise.resolve(data)
    } catch (error) {
      warn('calendarStore', 'fetchHomeFromCDN', 404)
      return Promise.resolve(INIT_HOME)
    }
  }

  /**
   * onAir数据
   */
  // 数据不会经常变化, 所以一个启动周期只请求一次
  _fetchOnAir = false
  fetchOnAir = async () => {
    if (this._fetchOnAir) {
      return
    }

    try {
      const { _response } = await xhrCustom({
        url: CDN_ONAIR()
      })

      const data = {
        _loaded: true
      }
      JSON.parse(_response).forEach(item => {
        const airEps = item.eps.filter(
          item => item.status === 'Air' || item.status === 'Today'
        )

        data[item.id] = {
          timeCN: item.timeCN,
          timeJP: item.timeJP,
          weekDayCN: item.weekDayCN,
          weekDayJP: item.weekDayJP
        }
        if (airEps.length) {
          data[item.id].air = airEps[airEps.length - 1].sort
        }
      })

      const key = 'onAir'
      this.clearState(key, data)
      this.setStorage(key, undefined, NAMESPACE)
      this._fetchOnAir = true
    } catch (error) {
      console.warn('[CalendarStore] fetchOnAir', error)
    }
  }
}

const Store = new Calendar()
Store.setup()

export default Store
