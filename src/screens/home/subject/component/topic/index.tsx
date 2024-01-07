/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 10:30:49
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_TOPIC } from '../../ds'
import { Ctx } from '../../types'
import Topic from './topic'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TopicWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showTopic[1]) return null

  const { showTopic } = systemStore.setting
  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_TOPIC)} />
      <Topic
        navigation={navigation}
        styles={memoStyles()}
        showTopic={showTopic}
        subjectId={$.subjectId}
        topic={$.filterTopic}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(TopicWrap, COMPONENT)
