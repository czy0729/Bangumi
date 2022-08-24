/*
 * 时间表, 发现页信息聚合
 *
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 16:53:56
 */
import { observable, computed, toJS } from 'mobx'
import { getTimestamp, HTMLTrim, HTMLToTree, findTreeNode } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import store from '@utils/store'
import { put, read } from '@utils/db'
import {
  API_CALENDAR,
  CDN_DISCOVERY_HOME,
  CDN_ONAIR,
  HOST,
  LIST_EMPTY
} from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import UserStore from '../user'
import { NAMESPACE, INIT_HOME, INIT_USER_ONAIR_ITEM } from './init'
import { cheerioToday } from './common'
import { Calendar, OnAirUser, State } from './types'

const state: State = {
  /** 每日放送 */
  calendar: LIST_EMPTY,

  /** 发现页信息聚合 */
  home: INIT_HOME,

  /** @deprecated 发现页信息聚合 (CDN) */
  homeFromCDN: INIT_HOME,

  /** ekibun的线上爬虫数据 */
  onAir: {},

  /** 用户自定义放送时间, onAir读取数据时, 需要用本数据覆盖原数据 */
  onAirUser: {}
}

class CalendarStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  // -------------------- get --------------------
  /** 每日放送, 结合onAir和用户自定义放送时间覆盖原数据 */
  @computed get calendar(): Calendar {
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
        const air_weekday = Number(weekDayCN) == 0 ? 7 : Number(weekDayCN)
        data.list[air_weekday - 1].items.push({
          ...item,
          air_weekday
        })
      })
    })

    return data
  }

  /** 发现页信息聚合 */
  @computed get home() {
    return this.state.home
  }

  /** @deprecated 发现页信息聚合 (CDN) */
  @computed get homeFromCDN() {
    return this.state.homeFromCDN
  }

  /** 需要用户自定义放送时间覆盖原数据 */
  @computed get onAir() {
    const { onAir, onAirUser } = this.state
    const keys = Object.keys(onAirUser)
    if (keys.length < 1) return onAir

    const _onAir = toJS(onAir)
    Object.keys(onAirUser).forEach(subjectId => {
      if (Number(subjectId) != 0) {
        const target = _onAir[subjectId]
        if (target) {
          const user = this.onAirUser(subjectId)
          const weekDay =
            user.weekDayCN === ''
              ? target.weekDayCN || target.weekDayJP
              : user.weekDayCN
          const time = user.timeCN || target.timeCN || target.timeJP
          target.weekDayCN = weekDay
          target.weekDayJP = weekDay
          target.timeCN = time
          target.timeJP = time
        }
      }
    })
    return _onAir
  }

  /** 用户自定义放送时间 */
  onAirUser(subjectId: SubjectId): typeof INIT_USER_ONAIR_ITEM {
    return computed<OnAirUser>(() => {
      const { onAirUser } = this.state
      return onAirUser[subjectId] || INIT_USER_ONAIR_ITEM
    }).get()
  }

  init = () => this.readStorage(Object.keys(this.state), NAMESPACE)

  // -------------------- fetch --------------------
  /** 每日放送 */
  fetchCalendar = () => {
    return this.fetch(
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
  }

  /** 发现页信息聚合 */
  fetchHome = async () => {
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
          if (idx === 0) return

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
          const subjectId = node ? node[0].attrs.href.replace('/subject/', '') : ''

          node =
            findTreeNode(children, 'p > small') || findTreeNode(children, 'div > small')
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

  /** 发现页信息聚合 (CDN) */
  fetchHomeFromCDN = async () => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_DISCOVERY_HOME()
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
      return data
    } catch (error) {
      return INIT_HOME
    }
  }

  private _fetchOnAir = false

  /** onAir数据, 数据不会经常变化, 所以一个启动周期只请求一次 */
  fetchOnAir = async () => {
    if (this._fetchOnAir) return

    try {
      let onAir = []

      try {
        const { _response } = await xhrCustom({
          url: CDN_ONAIR()
        })
        onAir = JSON.parse(_response)
      } catch (error) {}

      if (onAir.length <= 8) onAir = require('@constants/fallback/calendar.json')

      const data = {
        _loaded: true
      }
      onAir.forEach(item => {
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
    } catch (error) {}
  }

  /** 更新用户自定义放送时间 */
  updateOnAirUser = (subjectId: SubjectId, k: string, v: any) => {
    if (!subjectId) return

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

  /** 删除自定义放送时间 */
  resetOnAirUser = (subjectId: SubjectId) => {
    const { onAirUser } = this.state
    const _onAirUser = toJS(onAirUser)
    delete _onAirUser[subjectId]

    const key = 'onAirUser'
    this.clearState(key, _onAirUser)
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 上传用户自定义放送数据到云端 */
  uploadSetting = () => {
    if (!Object.keys(this.state.onAirUser).length) return false

    const { id } = UserStore.userInfo
    return put({
      path: `onair-user/${id}.json`,
      content: JSON.stringify(this.state.onAirUser)
    })
  }

  /** 恢复到云端的用户自定义放送数据 */
  downloadSetting = async () => {
    const { id } = UserStore.userInfo
    const { content } = await read({
      path: `onair-user/${id}.json`
    })

    if (!content) return false

    try {
      const onAirUser = JSON.parse(content)
      const key = 'onAirUser'

      // 本地的最优先
      this.setState({
        [key]: {
          ...onAirUser,
          ...this.state.onAirUser
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
      return true
    } catch (error) {
      return false
    }
  }
}

export default new CalendarStore()
