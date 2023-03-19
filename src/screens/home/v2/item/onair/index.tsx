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
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { styles } from './styles'

function OnAir({ subjectId }, { $ }: Ctx) {
  const subject = $.subject(subjectId)
  if (!subject.type) return null

  if (subject.type) {
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
    if (typeCn !== '动画' && typeCn !== '三次元') return null
  }

  const current = $.currentOnAir(subjectId)
  const total = $.epsCount(subjectId)

  // 防止完结的番剧因放送数据更新不及时, 导致一直显示放送中的问题
  if (current >= 8 && total >= 8 && current === total) return null

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
    const { weekDay, isOnair, h, m } = $.onAirCustom(subjectId)
    const weekDayText = isOnair ? `周${WEEK_DAY_MAP[weekDay]}` : ''
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
