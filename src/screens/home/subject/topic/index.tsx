/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:48:00
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import Topic from './topic'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Topic')

  const { showTopic } = systemStore.setting
  if (showTopic === -1) return null

  const { topic } = $.subject
  let _topic = topic || []
  if ($.filterDefault || $.isLimit) {
    _topic = _topic.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) return false
      return true
    })
  }

  if (!_topic.length) return null

  return (
    <Topic
      navigation={navigation}
      styles={memoStyles()}
      showTopic={showTopic}
      subjectId={$.subjectId}
      topic={_topic}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
