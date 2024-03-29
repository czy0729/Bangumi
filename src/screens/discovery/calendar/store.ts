/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 13:26:59
 */
import { computed, observable } from 'mobx'
import { calendarStore, collectionStore, subjectStore } from '@stores'
import { desc, getTimestamp, updateVisibleBottom } from '@utils'
import { queue, t } from '@utils/fetch'
import { decode, get } from '@utils/protobuf'
import store from '@utils/store'
import { SubjectId } from '@types'
import { getTime } from './utils'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenCalendar extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    return queue(
      [
        () => calendarStore.fetchOnAir(),
        () => calendarStore.fetchCalendar(),
        () => this.fetchBangumiData(),
        () => this.fetchCollectionsQueue()
      ],
      1
    )
  }

  /** 全局管理单独条目的收藏状态 */
  fetchCollectionsQueue = () => {
    if (getTimestamp() - this.state._lastQueue <= 24 * 60 * 60) return

    setTimeout(async () => {
      try {
        const subjectIds = []
        this.calendar.list.forEach(item => {
          item.items.forEach(i => {
            subjectIds.push(i.id)
          })
        })
        await collectionStore.fetchCollectionStatusQueue(subjectIds)

        this.setState({
          _lastQueue: getTimestamp()
        })
        this.save()
      } catch (error) {}
    }, 2000)
  }

  /** 加载 bangumi-data */
  fetchBangumiData = async () => {
    if (this.state.loadedBangumiData) return

    await decode('bangumi-data')
    this.setState({
      loadedBangumiData: true
    })
  }

  /** 本地化 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- get --------------------
  /** 每日放送 */
  @computed get calendar() {
    return calendarStore.calendar
  }

  /** SectionList sections */
  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) day = 7

    const showPrevDay = new Date().getHours() < 12
    const shift = day - (showPrevDay ? 2 : 1)
    const list = this.calendar.list.map(item => ({
      ...item,
      items: item.items.slice().sort((a, b) => desc(getTime(a), getTime(b)))
    }))
    return list
      .slice(shift)
      .concat(list.slice(0, shift))
      .map((item, index) => ({
        title: item.weekday.cn,
        index,
        data: [item]
      }))
  }

  /** 是否列表 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 放送站点 */
  sites(subjectId: SubjectId) {
    return computed(() => {
      if (!this.state.loadedBangumiData) return {}

      return get('bangumi-data')?.find(item => item.id == subjectId)?.s || {}
    }).get()
  }

  // -------------------- page --------------------
  /** 切换布局 */
  onSwitchLayout = () => {
    const layout = this.state.layout === 'list' ? 'grid' : 'list'
    this.setState({
      layout
    })
    this.save()

    t('每日放送.切换布局', {
      layout
    })
  }

  /** 切换类型 */
  onToggleType = () => {
    const type = this.state.type === 'all' ? 'collect' : 'all'
    this.setState({
      type
    })
    this.save()

    t('每日放送.切换类型', {
      type
    })
  }

  /** 切换展开 */
  onToggleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }

  /** 切换改编 */
  onAdapt = (adapt: string) => {
    let value: string
    if (adapt === '全部') {
      value = ''
    } else {
      value = adapt.split(' (')?.[0] || ''
    }
    this.setState({
      adapt: value
    })

    t('每日放送.切换改编', {
      adapt: value
    })
  }

  /** 切换标签 */
  onTag = (tag: string) => {
    let value: string
    if (tag === '全部') {
      value = ''
    } else {
      value = tag.split(' (')?.[0] || ''
    }
    this.setState({
      tag: value
    })

    t('每日放送.切换标签', {
      tag: value
    })
  }

  /** 切换标签 */
  onOrigin = (origin: string) => {
    let value: string
    if (origin === '全部') {
      value = ''
    } else {
      value = origin.split(' (')?.[0] || ''
    }
    this.setState({
      origin: value
    })

    t('每日放送.切换动画制作', {
      origin: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
