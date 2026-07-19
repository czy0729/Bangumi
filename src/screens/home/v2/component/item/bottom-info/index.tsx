/*
 * @Author: czy0729
 * @Date: 2026-07-18 05:24:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 23:16:13
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { MODEL_SETTING_HOME_ANIME_INFO_INLINE } from '@constants'
import { SEASON_COLORS } from '../ds'
import { calcSeason, getLeftText, getNextInfo } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TextProps } from '@components'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function BottomInfo({ subjectId, typeCn }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (
    MODEL_SETTING_HOME_ANIME_INFO_INLINE.getLabel(systemStore.setting.homeAnimeInfoInline) !==
    '底部'
  ) {
    return null
  }

  const subject = $.subject(subjectId)
  if (!subject?.air_date) return null

  const { year: seasonYear, quarter } = calcSeason(subject.air_date)
  const eps = $.epsNoSp(subjectId)
  const airedUnwatched = eps.filter(
    ep => (ep.status === 'Air' || ep.status === 'Today') && !(ep.id in $.userProgress(subjectId))
  ).length
  const leftText = getLeftText(seasonYear, quarter, airedUnwatched, $.hasNewEp(subjectId), typeCn)
  const nextInfo = getNextInfo(eps)
  if (!leftText && !nextInfo) return null

  const styles = memoStyles()
  const textProps: TextProps = {
    type: _.select('sub', 'icon'),
    size: 10,
    bold: true
  } as const

  return (
    <Flex style={styles.bottomInfo}>
      <View
        style={[
          styles.split,
          { backgroundColor: typeCn === '动画' ? SEASON_COLORS[quarter - 1] : _.colorBorder }
        ]}
      />
      <Flex.Item>
        <Text {...textProps}>{leftText}</Text>
      </Flex.Item>
      {!!nextInfo && <Text {...textProps}>{nextInfo}</Text>}
    </Flex>
  )
}

export default observer(BottomInfo)
