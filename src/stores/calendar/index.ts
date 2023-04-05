/*
 * 时间表, 发现页信息聚合
 * @Author: czy0729
 * @Date: 2019-04-20 11:41:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 06:24:42
 */
import { observable, computed, toJS } from 'mobx'
import {
  getTimestamp,
  HTMLTrim,
  HTMLToTree,
  findTreeNode,
  toLocal,
  deepClone
} from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import store from '@utils/store'
import { put, read } from '@utils/db'
import { API_CALENDAR, CDN_DISCOVERY_HOME, CDN_ONAIR, DEV, HOST } from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import UserStore from '../user'
import { LOG_INIT } from '../ds'
import {
  NAMESPACE,
  INIT_HOME,
  INIT_USER_ONAIR_ITEM,
  STATE,
  LOADED,
  INIT_CALENDAR,
  INIT_ONAIR_ITEM
} from './init'
import { cheerioToday } from './common'
import { fixedOnAir } from './utils'
import { ON_AIR } from './onair'
import { OnAir, OnAirItem, OnAirUser } from './types'

type CacheKey = keyof typeof LOADED

class CalendarStore extends store implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  private _fetchOnAir = false

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('CalendarStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 发现页信息聚合 */
  @computed get home() {
    this.init('home')
    return this.state.home
  }

  /** @deprecated 发现页信息聚合 (CDN) */
  @computed get homeFromCDN() {
    return this.state.homeFromCDN
  }

  /** API 每日放送数据, 并整合云端 onAir 数据 */
  @computed get calendar() {
    this.init('calendar')

    const data = {
      ...deepClone(INIT_CALENDAR),
      _loaded: getTimestamp()
    }

    const { calendar } = this.state
    calendar.list.forEach(item => {
      item.items.forEach(item => {
        if (!item.id) return

        const onAirLocal = this.onAirLocal(item.id)

        // 如果没能计算到整合数据, 回退使用 api 的放送星期数据
        const { air, ...rest } = onAirLocal
        if (Object.values(rest).every(value => value === '')) {
          onAirLocal.weekDayCN = item.air_weekday || 0
        }

        let air_weekday = Number(
          (typeof onAirLocal.weekDayLocal === 'number'
            ? onAirLocal.weekDayLocal
            : onAirLocal.weekDayCN) || 0
        )
        if (air_weekday === 0) air_weekday = 7

        data.list[air_weekday - 1].items.push({
          ...item,
          air_weekday,
          ...onAirLocal
        })
      })
    })

    return data
  }

  /** 云端 onAir */
  @computed get onAir() {
    this.init('onAir')
    return this.state.onAir
  }

  /** 用户自定义放送时间 */
  onAirUser(subjectId: SubjectId) {
    this.init('onAirUser')
    return computed<OnAirUser>(() => {
      const { onAirUser } = this.state
      return onAirUser[subjectId] || INIT_USER_ONAIR_ITEM
    }).get()
  }

  // -------------------- computed --------------------
  /** 整合: 云端放送, 用户自定义放送时间, 本地时区 */
  onAirLocal(subjectId: SubjectId) {
    return computed<OnAirItem>(() => {
      // 云端放送数据
      const onAir = this.onAir[subjectId] || INIT_ONAIR_ITEM

      // 用户自定义放送时间数据
      const onAirUser = this.onAirUser(subjectId)

      // 用户自定义放送时间最优先
      if (onAirUser.weekDayCN !== '' || onAirUser.timeCN !== '') {
        return {
          ...onAir,
          ...onAirUser,
          custom: true
        }
      }

      // 若云端和代码本地数据全为空, 不处理
      if (
        !onAir.weekDayCN &&
        !onAir.timeCN &&
        !onAir.weekDayJP &&
        !onAir.timeJP &&
        !ON_AIR[subjectId]
      ) {
        return {
          ...onAir
        }
      }

      // 本地时区次优先
      const onAirLocal = toLocal(
        onAir.weekDayCN || onAir.weekDayJP || ON_AIR[subjectId]?.weekDayCN,
        onAir.timeCN || onAir.timeJP || ON_AIR[subjectId]?.timeCN
      )
      return {
        ...onAir,
        ...onAirLocal
      }
    }).get()
  }

  // -------------------- fetch --------------------
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

          // @update 2022/12/30
          let cover =
            node?.[0]?.attrs?.style.match(/\/cover\/.+?\/(.+?).jpg/)?.[1] || ''
          if (cover) cover = `https://lain.bgm.tv/pic/cover/l/${cover}.jpg`

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
    this.save(key)

    return res
  }

  /** @deprecated 发现页信息聚合 (CDN) */
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

      // this.save(key)
      return data
    } catch (error) {
      return INIT_HOME
    }
  }

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

  /** onAir 数据, 数据不会经常变化, 所以一个启动周期只请求一次 */
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

      // 国外访问不到 CDN_ONAIR 接口的, 回退使用本地数据
      if (onAir.length <= 8) onAir = require('@assets/json/calendar.json')

      const data = {
        _loaded: getTimestamp()
      } as OnAir

      onAir.forEach(item => {
        data[item.id] = {
          timeCN: item.timeCN,
          timeJP: item.timeJP,
          weekDayCN: item.weekDayCN,
          weekDayJP: item.weekDayJP,
          air: 0
        }

        // 计算当前放送到多少集
        const airEps = item.eps.filter(
          (item: { status: string }) => item.status === 'Air' || item.status === 'Today'
        )
        if (airEps.length) data[item.id].air = airEps[airEps.length - 1].sort
      })

      const key = 'onAir'
      this.clearState(key, fixedOnAir(data))
      this.save(key)
      this._fetchOnAir = true
    } catch (error) {}
  }

  // -------------------- action --------------------
  /** 更新用户自定义放送时间 */
  updateOnAirUser = (
    subjectId: SubjectId,
    weekDayCN: string | number,
    timeCN: string
  ) => {
    if (!subjectId) return

    const key = 'onAirUser'
    this.setState({
      [key]: {
        [subjectId]: {
          weekDayCN,
          timeCN,
          _loaded: 1
        }
      }
    })
    this.save(key)
  }

  /** 删除自定义放送时间 */
  resetOnAirUser = (subjectId: SubjectId) => {
    const { onAirUser } = this.state
    const _onAirUser = toJS(onAirUser)
    delete _onAirUser[subjectId]

    const key = 'onAirUser'
    this.clearState(key, _onAirUser)
    this.save(key)
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
      this.save(key)
      return true
    } catch (error) {
      return false
    }
  }
}

export default new CalendarStore()
