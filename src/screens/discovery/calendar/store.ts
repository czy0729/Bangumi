/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-22 01:47:59
 */
import { observable, computed } from 'mobx'
import { calendarStore, subjectStore, collectionStore } from '@stores'
import { desc, getTimestamp, updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { decode, get } from '@utils/protobuf'
import { SubjectId } from '@types'
import { getTime } from './utils'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenCalendar extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    await queue([
      () => calendarStore.fetchOnAir(),
      () => calendarStore.fetchCalendar(),
      () => this.fetchBangumiData()
    ])
    this.fetchCollectionsQueue()
  }

  /** 全局管理单独条目的收藏状态 */
  fetchCollectionsQueue = () => {
    const { _lastQueue } = this.state
    if (getTimestamp() - _lastQueue <= 24 * 60 * 60) return

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
    const { layout } = this.state
    return layout === 'list'
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
    const _layout = this.isList ? 'grid' : 'list'
    t('每日放送.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.save()
  }

  /** 切换类型 */
  onToggleType = (label: string) => {
    const { type } = this.state
    const isAll = type === 'all'
    if (label) {
      if (label === '全部' && isAll) return
      if (label === '收藏' && type === 'collect') return
    }

    this.setState({
      type: type === 'all' ? 'collect' : 'all'
    })
    this.save()
  }

  /** 切换展开 */
  onToggleExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
