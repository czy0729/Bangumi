/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 11:22:56
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'
import { Props } from './ds'
import { memoStyles } from './styles'

export default obc(
  (
    { index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props,
    { $, navigation }: Ctx
  ) => {
    global.rerender('Home.Item', subject.name_cn || subject.name)

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        subject={subject}
        subjectId={subjectId}
        title={title}
        epStatus={epStatus}
        heatMap={$.heatMap}
        expand={$.$Item(subjectId).expand}
        epsCount={$.epsCount(subjectId)}
        isTop={$.state.top.indexOf(subjectId) !== -1}
        isFirst={index === 0}
        onItemPress={$.onItemPress}
      />
    )
  }
)
