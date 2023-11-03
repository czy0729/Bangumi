/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 04:40:18
 */
import { observable, computed } from 'mobx'
import {
  systemStore,
  calendarStore,
  userStore,
  discoveryStore,
  usersStore
} from '@stores'
import { ON_AIR } from '@stores/calendar/onair'
import {
  date,
  getTimestamp,
  appNavigate,
  appRandom,
  info,
  matchBgmUrl,
  desc,
  updateVisibleBottom
} from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { STORYBOOK, SUBJECT_TYPE } from '@constants'
import { Navigation, SubjectType } from '@types'
import { NAMESPACE, EXCLUDE_STATE, STATE, MenuMapType } from './ds'

export default class ScreenDiscovery extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const { showBlockTrain } = state
    this.setState({
      showBlockTrain,
      ...EXCLUDE_STATE
    })

    setTimeout(() => {
      queue([
        () => {
          if (STORYBOOK) return true

          return this.fetchOnline()
        },
        () => {
          if (userStore.isWebLogin) return this.fetchChannel()

          return true
        },
        async () => {
          await calendarStore.init('onAir')
          const { _loaded } = this.onAir
          if (getTimestamp() - Number(_loaded || 0) < 60 * 60 * 24) return true

          return calendarStore.fetchOnAir()
        },
        async () => {
          await calendarStore.init('calendar')
          const { list, _loaded } = calendarStore.calendar
          if (getTimestamp() - Number(_loaded || 0) < 60 * 60 * 12) {
            try {
              // 出现过成功请求过数据, 但是里面全为空的奇怪情况
              if (list.length && !list.every(item => item.items.length === 0)) {
                return true
              }
            } catch (error) {}
          }

          return calendarStore.fetchCalendar()
        },
        () => {
          if (STORYBOOK) return true

          return usersStore.fetchUsers()
        }
      ])
    }, 800)

    return calendarStore.fetchHome()
  }

  // -------------------- fetch --------------------
  /** 在线人数 */
  fetchOnline = () => {
    return discoveryStore.fetchOnline()
  }

  /** 频道聚合 */
  fetchChannel = () => {
    return queue(
      SUBJECT_TYPE.map(
        item => () =>
          discoveryStore.fetchChannel({
            type: item.label
          })
      ),
      1
    )
  }

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- get --------------------
  /** 自己用户信息 */
  @computed get userInfo() {
    return userStore.userInfo
  }

  /** 发现页信息聚合 */
  @computed get home() {
    return calendarStore.home
  }

  /** 随机打乱 */
  @computed get ramdonHome() {
    return {
      ...this.home,
      anime: appRandom(this.home.anime, 'info'),
      book: appRandom(this.home.book, 'info'),
      game: appRandom(this.home.game, 'info'),
      music: appRandom(this.home.music, 'info'),
      real: appRandom(this.home.real, 'info')
    }
  }

  /** 今日上映 - 部。共 - 人收看今日番组 */
  @computed get today() {
    const { today } = calendarStore.home
    return today
  }

  /** 是否限制内容展示的用户 */
  @computed get isLimit() {
    return userStore.isLimit
  }

  /** 在线人数 */
  @computed get online() {
    return discoveryStore.online || systemStore.ota.online
  }

  /** 好友对象 */
  @computed get friendsMap() {
    return usersStore.friendsMap
  }

  /** 好友的频道聚合信息 */
  friendsChannel(type: SubjectType) {
    return computed(() => discoveryStore.channel(type).friends).get()
  }

  /** ekibun 的线上爬虫数据 */
  @computed get onAir() {
    return calendarStore.onAir
  }

  /** 放送数据 */
  @computed get calendar() {
    const { list } = calendarStore.calendar
    const _list = list.map(item => ({
      ...item,
      items: item.items
        .map(i => {
          const { air = 0, timeCN, timeJP } = this.onAir[i.id] || ON_AIR[i.id] || {}
          return {
            ...i,
            air,

            /**
             * @fixed 20210217 bangumi 的每日放送是以日本放送日作为分组, 所以时间应以日本时间为主
             * 避免刚好 +1 小时时差导致周几错误
             */
            timeCN: timeCN || timeJP || '2359'
          }
        })
        .filter(item => item.timeCN !== '2359') // 暂时把没有放送具体时间的番剧隐藏
        .sort((a, b) => desc(String(a.timeCN || ''), String(b.timeCN || '')))
    }))

    const calendar = []
    _list.forEach(item => {
      item.items.forEach(i => {
        calendar.push({
          ...i,
          weekday: item.weekday.id
        })
      })
    })

    return calendar.reverse()
  }

  /** 今日放送数据 */
  @computed get todayBangumi() {
    try {
      const time = date('Hi', getTimestamp())
      const current = parseInt(`${new Date().getDay() || 7}${time || '0000'}`)
      const index = this.calendar.findIndex(
        item =>
          current >= parseInt(`${item.weekDayLocal || 7}${item.timeLocal || '0000'}`)
      )

      // 在前面和后面拼接多一组数据, 可以实现循环每周, 补全数据
      const circle = [...this.calendar, ...this.calendar, ...this.calendar]
      const data = circle
        .slice(index - 10 + this.calendar.length, index + 2 + this.calendar.length)
        .reverse()
      return data
    } catch (error) {
      return []
    }
  }

  /** 发现页自定义菜单 */
  @computed get discoveryMenu() {
    const { setting } = systemStore
    return setting.discoveryMenu as MenuMapType[]
  }

  /** 发现页今日放送 */
  @computed get discoveryTodayOnair() {
    const { setting } = systemStore
    return setting.discoveryTodayOnair
  }

  /** 发现菜单一列个数 */
  @computed get discoveryMenuNum() {
    const { setting } = systemStore
    return setting.discoveryMenuNum
  }

  // -------------------- action --------------------
  /** 展开菜单 */
  openMenu = () => {
    this.setState({
      expand: true
    })
    this.save()
  }

  /** 收起菜单 */
  closeMenu = () => {
    this.setState({
      expand: false
    })
    this.save()
  }

  /** 刷新到顶函数引用 */
  scrollToIndex: any

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: { scrollToIndex: any }) => {
    this.scrollToIndex = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      if (typeof this.scrollToIndex === 'function') {
        t('其他.刷新到顶', {
          screen: 'Discovery'
        })

        this.fetchOnline()
        this.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      console.error('Discovery', 'onRefreshThenScrollTop', error)
    }
  }

  /** 切换识别剪贴板的弹窗 */
  toggleLinkModal = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  /** 识别剪贴板的弹窗中的输入框 */
  onChangeText = (link: string) => {
    this.setState({
      link
    })
  }

  /** 剪贴板提交 */
  onLinkSubmit = (navigation: Navigation) => {
    let { link } = this.state
    if (!link.length) {
      info('请输入链接')
      return
    }

    if (!(link.includes('http://') || link.includes('https://'))) {
      link = `https://${link}`
    }

    const urls = matchBgmUrl(link, true) || []
    const url = urls[0]
    if (!url) {
      info('链接不符合格式')
      return
    }

    appNavigate(url, navigation)
    this.setState({
      visible: false,
      link: ''
    })

    t('发现.剪贴板', {
      link
    })
  }

  /** 切换是否拖拽中 */
  toggleDragging = () => {
    const { dragging } = this.state
    try {
      if (!dragging) {
        this.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      console.error('Discovery', 'toggleDragging', error)
    }

    this.setState({
      dragging: !dragging
    })
  }

  /** 是否显示年鉴 2021 的动画 */
  toggleBlockTrain = () => {
    const { showBlockTrain } = this.state
    this.setState({
      showBlockTrain: !showBlockTrain
    })
    this.save()
  }

  /** 更新菜单的自定义配置 */
  saveDiscoveryMenu = (discoveryMenu: typeof systemStore.setting.discoveryMenu) => {
    systemStore.setSetting('discoveryMenu', discoveryMenu)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
