/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 19:59:02
 */
import { observable, computed } from 'mobx'
import { calendarStore } from '@stores'
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
          'https://raw.githubusercontent.com/ekibun/bangumi_calendar/master/calendar.json'
      })
      const calendarData = {
        _loaded: true
      }
      JSON.parse(_response).forEach(item => {
        calendarData[item.id] = {
          air: item.eps[0].sort
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

  // -------------------- page --------------------

  // -------------------- action --------------------
}
