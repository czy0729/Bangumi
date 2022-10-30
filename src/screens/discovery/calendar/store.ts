/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 21:10:44
 */
import { observable, computed } from 'mobx'
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import { calendarStore, subjectStore, collectionStore } from '@stores'
import { desc, feedback, getTimestamp } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { BangumiData, SubjectId } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'

export default class ScreenCalendar extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      _loaded: true
    })

    await queue([() => calendarStore.fetchOnAir(), () => calendarStore.fetchCalendar()])
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
        this.setStorage(NAMESPACE)
      } catch (error) {}
    }, 2000)
  }

  // -------------------- get --------------------
  /** 用户自定义放送时间 */
  @computed get onAir() {
    return calendarStore.onAir
  }

  /** 每日放送, 结合onAir和用户自定义放送时间覆盖原数据 */
  @computed get calendar() {
    const { list } = calendarStore.calendar
    return {
      ...calendarStore.calendar,
      list: list.map(item => ({
        ...item,
        items: item.items
          .map(i => {
            const { air = 0, timeCN, timeJP } = this.onAir[i.id] || {}
            return {
              ...i,
              air,

              /**
               * @fixed 20210217 bangumi的每日放送是以日本放送日作为分组, 所以时间应以日本时间为主
               * 避免刚好+1小时时差导致周几错误
               */
              timeCN: timeCN || timeJP || '2359'
            }
          })
          // .filter(item => item.timeCN !== '2359') // 暂时把没有放送具体时间的番剧隐藏
          .sort((a, b) => desc(String(a.timeCN || ''), String(b.timeCN || '')))
      }))
    }
  }

  /** SectionList sections */
  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) day = 7

    const { list } = this.calendar
    const showPrevDay = new Date().getHours() < 12
    const shift = day - (showPrevDay ? 2 : 1)

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
      return (bangumiData as BangumiData).find(item => item.id == subjectId)?.s || {}
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
    this.setStorage(NAMESPACE)
  }

  /** 切换类型 */
  onToggleType = label => {
    const { type } = this.state
    const isAll = type === 'all'
    if (label) {
      if (label === '全部' && isAll) return
      if (label === '收藏' && type === 'collect') return
    }

    this.setState({
      type: type === 'all' ? 'collect' : 'all'
    })
    this.setStorage(NAMESPACE)
  }

  /** 切换展开 */
  onToggleExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(NAMESPACE)
  }

  /** 显示收藏管理框 */
  onShowManageModal = args => {
    const { subjectId, title, desc, status } = args || {}
    this.setState({
      modal: {
        visible: true,
        subjectId,
        title,
        desc,
        status: status || '',
        action: '看'
      }
    })
  }

  /** 隐藏收藏管理框 */
  onCloseManageModal = () => {
    this.setState({
      modal: {
        visible: false
      }
    })

    // 等到关闭动画完成后再重置
    setTimeout(() => {
      this.setState({
        modal: EXCLUDE_STATE.modal
      })
    }, 400)
  }

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    await collectionStore.doUpdateCollection(values)
    feedback()

    const { subjectId } = this.state.modal
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue([subjectId])
    }, 400)

    this.onCloseManageModal()
  }
}
