/*
 * @Author: czy0729
 * @Date: 2024-01-20 06:49:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:58:10
 */
import React from 'react'
import { Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId, SubjectTypeCn } from '@types'
import { WEEK_DAY_MAP } from '../../../ds'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'

function Doing({
  subjectId,
  typeCn,
  doing
}: {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  doing: number
}) {
  const { $ } = useStore<Ctx>()
  if (systemStore.setting.homeListCompact) return null

  const currentDoing = doing || $.subject(subjectId)?.collection?.doing || 0
  if (!currentDoing) return null

  const { weekDay, isOnair } = $.onAirCustom(subjectId)
  const weekDayText = systemStore.setting.homeOnAir
    ? ''
    : isOnair
    ? ` · 周${WEEK_DAY_MAP[weekDay]}`
    : ''

  return (
    <Text style={_.mt.xs} type='sub' size={12}>
      {currentDoing} 人在{typeCn === '书籍' ? '读' : typeCn === '游戏' ? '玩' : '看'}
      {weekDayText}
    </Text>
  )
}

export default ob(Doing, COMPONENT)
