/*
 * @Author: czy0729
 * @Date: 2023-05-23 14:00:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 20:50:22
 */
import { toJS } from 'mobx'
import calendarStore from '@stores/calendar'
import { getTimestamp, desc } from '@utils/utils'

function getTime(item: any) {
  return String(item?.timeLocal || item?.timeCN || item?.timeJP || '2359')
}

export default async function getData() {
  await calendarStore.init('onAir')
  await calendarStore.init('calendar')

  const now = getTimestamp()
  const distance = 60 * 60 * 24
  if (
    !calendarStore.onAir._loaded ||
    now - Number(calendarStore.onAir._loaded || 0) >= distance
  ) {
    await calendarStore.fetchOnAir()
  }

  if (
    !calendarStore.calendar._loaded ||
    now - Number(calendarStore.calendar._loaded || 0) >= distance
  ) {
    await calendarStore.fetchCalendar()
  }

  let day = new Date().getDay()
  if (day === 0) day = 7
  const showPrevDay = new Date().getHours() < 12
  const shift = day - (showPrevDay ? 2 : 1)
  const list = calendarStore.calendar.list.map(item => ({
    ...item,
    items: item.items.slice().sort((a, b) => desc(getTime(a), getTime(b)))
  }))

  return {
    day,
    calendar: toJS(
      list
        .slice(shift)
        .concat(list.slice(0, shift))
        .map((item, index) => ({
          title: item.weekday.cn,
          index,
          data: [item]
        }))?.[0]?.data[0]?.items || []
    )
  }
}
