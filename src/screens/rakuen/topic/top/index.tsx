/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 08:40:27
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { HOST_IMAGE } from '@utils/app/ds'
import { CDN_OSS_MAGMA_PIC } from '@constants'
import { Ctx } from '../types'
import Top from './top'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Topic.Top')

  const { _replies } = $.params
  const { _loaded } = $.comments

  const { cdn, cdnOrigin } = systemStore.setting
  let groupThumb = $.groupThumb
  if (
    cdn &&
    cdnOrigin === 'magma' &&
    typeof groupThumb === 'string' &&
    groupThumb.includes(HOST_IMAGE)
  ) {
    groupThumb = CDN_OSS_MAGMA_PIC(groupThumb)
  }

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
      groupThumb={groupThumb}
      groupThumbFallback={$.groupThumb}
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
