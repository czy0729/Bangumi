/*
 * @Author: czy0729
 * @Date: 2021-01-21 13:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:57:58
 */
import React from 'react'
import { Text } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { WEEK_DAY_MAP } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function OnAir({ subjectId, typeCn }: { subjectId: SubjectId; typeCn: SubjectTypeCn }) {
  const { $ } = useStore<Ctx>()
  if (typeCn !== '动画' && typeCn !== '三次元') return null

  // 防止完结的番剧因放送数据更新不及时, 导致一直显示放送中的问题
  const current = $.currentOnAir(subjectId)
  if (current >= 8 && !systemStore.setting.homeOnAir) {
    const total = $.epsCount(subjectId)
    if (total >= 8 && current === total) return null
  }

  if ($.isToday(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={styles.onAir} type='success' size={13} lineHeight={14} bold>
        今天 {t.join(':')}
      </Text>
    )
  }

  if ($.isNextDay(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    const t = [h, m].filter(item => !!item)
    return (
      <Text style={styles.onAir} type='sub' size={13} lineHeight={14} bold>
        明天 {t.join(':')}
      </Text>
    )
  }

  if (systemStore.setting.homeOnAir) {
    const { weekDay, h, m } = $.onAirCustom(subjectId)
    if (WEEK_DAY_MAP[weekDay] && h && m) {
      const weekDayText = `周${WEEK_DAY_MAP[weekDay]}`
      const t = [h, m].filter(item => !!item)
      return (
        <Text style={styles.onAir} type='sub' size={13} lineHeight={14} bold>
          {weekDayText} {t.join(':')}
        </Text>
      )
    }
  }

  return null
}

export default ob(OnAir, COMPONENT)
