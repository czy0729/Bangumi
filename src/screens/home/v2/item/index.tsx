/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 10:55:37
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Item from './item'
import { Props } from './ds'
import { memoStyles } from './styles'

export default obc(
  (
    { index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props,
    { $, navigation }: Ctx
  ) => {
    rerender('Home.Item', subject.name_cn || subject.name)

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
        epStatus={epStatus}
        heatMap={heatMap}
        homeListCompact={homeListCompact}
        expand={$.$Item(subjectId).expand}
        epsCount={$.epsCount(subjectId)}
        isTop={top.indexOf(subjectId) !== -1}
        isRefreshing={
          fetchingSubjectId1 === subjectId || fetchingSubjectId2 === subjectId
        }
        onItemPress={$.onItemPress}
      />
    )
  }
)
