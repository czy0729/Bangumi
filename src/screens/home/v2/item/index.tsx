/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 19:56:03
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'
import { LIMIT_HEAVY, Props } from './ds'
import { memoStylesLazy, memoStyles } from './styles'

export default obc(
  (
    { index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props,
    { $, navigation }: Ctx
  ) => {
    global.rerender('Home.Item', subject.name_cn || subject.name)

    const { top, _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) return <View style={memoStylesLazy().lazy} />

    const { expand } = $.$Item(subjectId)
    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        subject={subject}
        subjectId={subjectId}
        title={title}
        epStatus={epStatus}
        heatMap={$.heatMap}
        expand={expand}
        epsCount={$.eps(subjectId).length}
        isTop={top.indexOf(subjectId) !== -1}
        isFirst={index === 0}
        onItemPress={$.onItemPress}
      />
    )
  }
)
