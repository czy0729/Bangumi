/*
 * 时间表, 首页信息聚合
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-15 04:15:27
 */
import { observable, computed, toJS } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import { HOST, LIST_EMPTY } from '@constants'
import { API_CALENDAR } from '@constants/api'
import { CDN_ONAIR, CDN_DISCOVERY_HOME } from '@constants/cdn'
import { NAMESPACE, INIT_HOME, INIT_USER_ONAIR_ITEM } from './init'
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
    },

    /**
     * 用户自定义放送时间
     * onAir读取数据时, 需要用本数据覆盖原数据
     */
    onAirUser: {
      0: INIT_USER_ONAIR_ITEM
    }
  })

  init = () =>
    this.readStorage(
      ['calendar', 'home', 'homeFromCDN', 'onAir', 'onAirUser'],
      NAMESPACE
    )

  /**
   * 需要用户自定义放送时间覆盖原数据
   */
  @computed get onAir() {
    const { onAir, onAirUser } = this.state
    const keys = Object.keys(onAirUser)
    if (keys.length < 1) return onAir

    const _onAir = toJS(onAir)
    Object.keys(onAirUser).forEach(subjectId => {
      if (subjectId != 0) {
        const target = _onAir[subjectId]
        if (target) {
          const user = this.onAirUser(subjectId)
          target.weekDayCN = user.weekDayCN || target.weekDayCN
          target.timeCN = user.timeCN || target.timeCN
          target.weekDayJP = user.weekDayCN || target.weekDayJP
          target.timeJP = user.timeCN || target.timeJP
        }
      }
    })
    return _onAir
  }

  /**
   * 需要结合onAir和用户自定义放送时间覆盖原数据
   */
  @computed get calendar() {
    const data = {
      list: [
        {
          items: [],
          weekday: { en: 'Mon', cn: '星期一', ja: '月耀日', id: 1 }
        },
        {
          items: [],
          weekday: { en: 'Tue', cn: '星期二', ja: '火耀日', id: 2 }
        },
        {
          items: [],
          weekday: { en: 'Wed', cn: '星期三', ja: '水耀日', id: 3 }
        },
        {
          items: [],
          weekday: { en: 'Thu', cn: '星期四', ja: '木耀日', id: 4 }
        },
        {
          items: [],
          weekday: { en: 'Fri', cn: '星期五', ja: '金耀日', id: 5 }
        },
        {
          items: [],
          weekday: { en: 'Sat', cn: '星期六', ja: '土耀日', id: 6 }
        },
        {
          items: [],
          weekday: { en: 'Sun', cn: '星期日', ja: '日耀日', id: 7 }
        }
      ],
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    }

    const { calendar } = this.state
    calendar.list.forEach((item, index) => {
      const { items } = item
      items.forEach(item => {
        const onAir = this.onAir[item.id]
        if (!onAir) {
          data.list[index].items.push(item)
          return
        }

        const { weekDayCN } = onAir
        const air_weekday = weekDayCN == 0 ? 7 : weekDayCN
        data.list[air_weekday - 1].items.push({
          ...item,
          air_weekday
        })
      })
    })

    return data
  }

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
   * 数据不会经常变化, 所以一个启动周期只请求一次
   */
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

          // weekDayCN === 0 为没国内放送, 使用weekDayJP, weekDayCN === 7 要转换为 0
          weekDayCN:
            item.weekDayCN === 0
              ? item.weekDayJP
              : item.weekDayCN === 7
              ? 0
              : item.weekDayCN,
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

  /**
   * 更新用户自定义放送时间
   */
  updateOnAirUser = (subjectId, k, v) => {
    if (!subjectId) {
      return
    }

    const key = 'onAirUser'
    const item = this.onAirUser(subjectId)
    this.setState({
      [key]: {
        [subjectId]: {
          ...item,
          [k]: v,
          _loaded: 1
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  resetOnAirUser = subjectId => {
    const { onAirUser } = this.state
    const _onAirUser = toJS(onAirUser)
    delete _onAirUser[subjectId]

    const key = 'onAirUser'
    this.clearState(key, _onAirUser)
    this.setStorage(key, undefined, NAMESPACE)
  }
}

const Store = new Calendar()
Store.setup()

export default Store
