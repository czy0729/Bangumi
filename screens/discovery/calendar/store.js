/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 21:27:27
 */
import { observable, computed } from 'mobx'
import { calendarStore, userStore } from '@stores'
import { xhrCustom } from '@utils/fetch'
import store from '@utils/store'

export default class ScreenCalendar extends store {
  state = observable({
    calendarData: {}
  })

  init = () => {
    calendarStore.fetchCalendar()

    const { calendarData } = this.state
    if (!calendarData._loaded) {
      this.fetchCalendarData()
    }
  }

  fetchCalendarData = async () => {
    try {
      const { _response } = await xhrCustom({
        url:
          'https://raw.githubusercontent.com/ekibun/bangumi_onair/master/calendar.json'
      })
      const calendarData = {
        _loaded: true
      }
      JSON.parse(_response).forEach(item => {
        const airEps = item.eps.filter(item => item.status === 'Air')
        calendarData[item.id] = {
          timeJP: item.timeJP
        }
        if (airEps.length) {
          calendarData[item.id].air = airEps[airEps.length - 1].sort
        }
      })
      this.setState({
        calendarData
      })
    } catch (error) {
      // do nothing
    }
  }

  // -------------------- get --------------------
  @computed get calendar() {
    return calendarStore.calendar
  }

  @computed get userCollection() {
    return userStore.userCollection
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
