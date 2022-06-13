/*
 * @Author: czy0729
 * @Date: 2021-01-21 13:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:17:24
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
      <Text style={styles.onAir} type='success' size={13} lineHeight={14} bold>
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
      <Text style={styles.onAir} type='sub' size={13} lineHeight={14} bold>
        明天{t.join(':')}
      </Text>
    )
  }

  return null
}

export default obc(OnAir)

const styles = _.create({
  onAir: {
    marginTop: -1,
    marginLeft: _.sm
  }
})
