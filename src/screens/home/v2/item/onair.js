/*
 * @Author: czy0729
 * @Date: 2021-01-21 13:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-02 19:57:57
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function OnAir({ subjectId }, { $ }) {
  const isToday = $.isToday(subjectId)
  if (isToday) {
    const onAir = $.onAir[subjectId] || $.onAirUser(subjectId) || {}
    const time = onAir.timeCN || onAir.timeJP || ''
    const t = [time.slice(0, 2), time.slice(2, 4)].filter(item => !!item)
    return (
      <Text style={_.ml.sm} type='success' size={13} lineHeight={15} bold>
        {t.join(':')}
      </Text>
    )
  }

  const isNextDay = $.isNextDay(subjectId)
  if (isNextDay) {
    const onAir = $.onAir[subjectId] || $.onAirUser(subjectId) || {}
    const time = onAir.timeCN || onAir.timeJP || ''
    const t = [time.slice(0, 2), time.slice(2, 4)].filter(item => !!item)
    return (
      <Text style={_.ml.sm} type='sub' size={13} lineHeight={15} bold>
        明天{t.join(':')}
      </Text>
    )
  }

  return null
}

export default obc(OnAir)
