/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:05:07
 */
import React from 'react'
import { Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEEK_DAY_MAP } from '../../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Onair({ subjectId }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Onair
