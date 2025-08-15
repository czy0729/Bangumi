/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:54:36
 */
import React from 'react'
import { Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEEK_DAY_MAP } from '../../../ds'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'

function Onair({ subjectId }) {
  const { $ } = useStore<Ctx>()
  const style = _.isMobileLanscape ? _.mt.xs : _.mt.md
  if ($.isToday(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    return (
      <Text style={style} type='success' align='center' size={13} bold>
        {h}:{m}
      </Text>
    )
  }

  if ($.isNextDay(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    return (
      <Text style={style} type='sub' align='center' size={13} bold>
        明天 {h}:{m}
      </Text>
    )
  }

  if (systemStore.setting.homeOnAir) {
    const { weekDay, h, m } = $.onAirCustom(subjectId)
    if (WEEK_DAY_MAP[weekDay] && h && m) {
      const weekDayText = `周${WEEK_DAY_MAP[weekDay]}`
      const t = [h, m].filter(item => !!item)
      return (
        <Text style={style} type='sub' align='center' size={13} lineHeight={14} bold>
          {weekDayText} {t.join(':')}
        </Text>
      )
    }
  }

  return null
}

export default ob(Onair, COMPONENT)
