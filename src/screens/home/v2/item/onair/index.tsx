/*
 * @Author: czy0729
 * @Date: 2021-01-21 13:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 14:57:11
 */
import React from 'react'
import { Text } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { styles } from './styles'

function OnAir({ subjectId }, { $ }: Ctx) {
  const isToday = $.isToday(subjectId)
  if (isToday) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={styles.onAir} type='success' size={13} lineHeight={14} bold>
        今天 {t.join(':')}
      </Text>
    )
  }

  const isNextDay = $.isNextDay(subjectId)
  if (isNextDay) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={styles.onAir} type='sub' size={13} lineHeight={14} bold>
        明天 {t.join(':')}
      </Text>
    )
  }

  if (systemStore.setting.homeOnAir) {
    const { weekDay, isExist, h, m } = $.onAirCustom(subjectId)
    const weekDayText = isExist ? `周${WEEK_DAY_MAP[weekDay]}` : ''
    if (!weekDayText) return null

    const t = [h, m].filter(item => !!item)
    return (
      <Text style={styles.onAir} type='sub' size={13} lineHeight={14} bold>
        {weekDayText} {t.join(':')}
      </Text>
    )
  }

  return null
}

export default obc(OnAir)
