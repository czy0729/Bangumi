/*
 * @Author: czy0729
 * @Date: 2021-01-21 13:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-14 16:27:35
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function OnAir({ subjectId }, { $ }) {
  const isToday = $.isToday(subjectId)
  if (isToday) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={_.ml.sm} type='success' size={13} lineHeight={15} bold>
        {!t.length && '今天'}
        {t.join(':')}
      </Text>
    )
  }

  const isNextDay = $.isNextDay(subjectId)
  if (isNextDay) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={_.ml.sm} type='sub' size={13} lineHeight={15} bold>
        明天{t.join(':')}
      </Text>
    )
  }

  return null
}

export default obc(OnAir)
