/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 08:40:27
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Top from './top'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Topic.Top')

  const { _replies } = $.params
  const { _loaded } = $.comments
  return (
    <Top
      navigation={navigation}
      styles={memoStyles()}
      topicId={$.topicId}
      title={$.title}
      subTitle={$.subTitle}
      time={$.time}
      replies={_replies}
      group={$.group}
      groupHref={$.groupHref}
      groupThumb={$.groupThumb}
      avatar={$.avatar}
      userId={$.userId}
      userName={$.userName}
      userSign={$.userSign}
      html={$.html}
      commentsLoaded={!!_loaded}
      monoId={$.monoId}
      isMono={$.isMono}
      delete={$.topic.delete}
    />
  )
})
