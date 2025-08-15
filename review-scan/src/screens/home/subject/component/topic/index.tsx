/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:10:19
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_TOPIC } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Topic from './topic.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TopicWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showTopic[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-topic'>
        <View
          ref={ref => onBlockRef(ref, TITLE_TOPIC)}
          style={_.container.layout}
          collapsable={false}
        />
        <Topic
          navigation={navigation}
          styles={memoStyles()}
          showTopic={systemStore.setting.showTopic}
          subjectId={$.subjectId}
          topic={$.filterTopic}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split />
      </Component>
    </Suspense>
  )
}

export default ob(TopicWrap, COMPONENT)
