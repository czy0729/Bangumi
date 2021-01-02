/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-03 04:17:56
 */
import { observable, computed } from 'mobx'
import { _, calendarStore, userStore, collectionStore } from '@stores'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'

const num = _.isPad ? 4 : 3
const percent = _.isPad ? 0.22 : 0.3

export const imageWidth = (_.window.width - _.wind * 2) * percent
export const imageHeight = imageWidth * 1.4
export const marginLeft = (_.window.contentWidth - num * imageWidth) / (num + 1)

const namespace = 'ScreenCalendar'

export default class ScreenCalendar extends store {
  state = observable({
    layout: 'list', // list | grid
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      _loaded: true
    })

    return queue([
      () => calendarStore.fetchOnAir(),
      () => calendarStore.fetchCalendar()
    ])
  }

  // -------------------- get --------------------
  @computed get onAir() {
    return calendarStore.onAir
  }

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
              timeCN: timeCN || timeJP || '2359'
            }
          })
          .filter(item => item.timeCN !== '2359') // 暂时把没有放送具体时间的番剧隐藏
          .sort((a, b) => a.timeCN.localeCompare(b.timeCN))
      }))
    }
  }

  @computed get userCollection() {
    return userStore.userCollection
  }

  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) {
      day = 7
    }

    const { list } = this.calendar
    return list
      .slice(day - 1)
      .concat(list.slice(0, day - 1))
      .map((item, index) => ({
        title: item.weekday.cn,
        index,
        data: [item]
      }))
  }

  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  // -------------------- page --------------------
  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'

    t('每日放送.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
