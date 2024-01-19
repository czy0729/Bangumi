/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 22:04:21
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT, Props } from './ds'
import { memoStyles } from './styles'

function ItemWrap(
  { index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props,
  { $, navigation }: Ctx
) {
  const { heatMap, homeListCompact } = systemStore.setting
  const { top, progress } = $.state
  const { fetchingSubjectId1, fetchingSubjectId2 } = progress
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      index={index}
      subject={subject}
      subjectId={subjectId}
      title={title}
      epStatus={Math.max(Number(epStatus) || 0, $.epStatus(subjectId))}
      heatMap={heatMap}
      homeListCompact={homeListCompact}
      expand={$.$Item(subjectId).expand}
      epsCount={$.epsCount(subjectId)}
      isTop={top.indexOf(subjectId) !== -1}
      isRefreshing={fetchingSubjectId1 === subjectId || fetchingSubjectId2 === subjectId}
      onItemPress={$.onItemPress}
    />
  )
}

export default obc(ItemWrap, COMPONENT)
