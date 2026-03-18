/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:37:43
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_TOPIC } from '../../ds'
import Split from '../split'
import Topic from './topic'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function TopicWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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

export default observer(TopicWrap)
