/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-10 19:06:05
 */
import { observable, computed } from 'mobx'
import { calendarStore, discoveryStore, tagStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 2

export default class ScreenDiscovery extends store {
  state = observable({
    home: {
      list: [
        {
          type: MODEL_SUBJECT_TYPE.getLabel('动画')
        },
        {
          type: MODEL_SUBJECT_TYPE.getLabel('书籍')
        }
      ],
      pagination: {
        page: 1,
        pageTotal: 2
      },
      _loaded: getTimestamp()
    }
  })

  init = async () => {
    // 随便看看
    if (!this.random._loaded) {
      await discoveryStore.fetchRandom(true)
    }

    // 每日放送
    if (!this.calendar._loaded) {
      await calendarStore.fetchCalendar()
    }

    // 排行版
    if (!this.rank._loaded) {
      await tagStore.fetchRank()
    }

    // 推荐数据
    return calendarStore.fetchHome()
  }

  fetchHome = () => {
    this.setState({
      home: {
        list: MODEL_SUBJECT_TYPE.data.map(item => ({
          type: item.label
        })),
        pagination: {
          page: 2,
          pageTotal: 2
        },
        _loaded: getTimestamp()
      }
    })
  }

  // -------------------- get --------------------
  @computed get home() {
    return calendarStore.home
  }

  @computed get random() {
    return discoveryStore.random
  }

  @computed get calendar() {
    return calendarStore.calendar
  }

  @computed get rank() {
    return tagStore.rank()
  }
}
