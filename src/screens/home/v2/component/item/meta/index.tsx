/*
 * @Author: czy0729
 * @Date: 2024-01-20 06:49:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 23:11:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { MODEL_SETTING_HOME_ANIME_INFO_INLINE } from '@constants'
import { WEEK_DAY_MAP } from '../../ds'
import { calcSeason, getLeftText, getNextInfo } from '../utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Meta({ subjectId, typeCn, doing }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { homeListCompact, homeOnAir, homeAnimeInfoInline } = systemStore.setting
  if (homeListCompact) return null

  const currentDoing = doing || $.subject(subjectId)?.collection?.doing || 0
  let text = ''
  if (currentDoing) {
    const { weekDay, isOnair } = $.onAirCustom(subjectId)
    text = `${currentDoing} 人在${typeCn === '书籍' ? '读' : typeCn === '游戏' ? '玩' : '看'}`
    if (!homeOnAir && isOnair) text += ` · 周${WEEK_DAY_MAP[weekDay]}`
  }

  const hasExtraMeta = MODEL_SETTING_HOME_ANIME_INFO_INLINE.getLabel(homeAnimeInfoInline) === '行内'
  if (hasExtraMeta) {
    const subject = $.subject(subjectId)
    if (subject?.air_date) {
      const { year: seasonYear, quarter } = calcSeason(subject.air_date)
      const eps = $.epsNoSp(subjectId)
      const airedUnwatched = eps.filter(
        ep =>
          (ep.status === 'Air' || ep.status === 'Today') && !(ep.id in $.userProgress(subjectId))
      ).length
      const leftText = getLeftText(
        seasonYear % 100,
        quarter,
        airedUnwatched,
        $.hasNewEp(subjectId),
        typeCn
      )
      const nextInfo = getNextInfo(eps, false)
      const parts = [leftText, nextInfo].filter(Boolean)
      if (parts.length) {
        if (text) text += ` · ${parts.join(' · ')}`
        else text = parts.join(' · ')
      }
    }
  }
  if (!text) return null

  return (
    <Text style={_.mt.xs} type='sub' size={hasExtraMeta ? 11 : 12}>
      {text}
    </Text>
  )
}

export default observer(Meta)
