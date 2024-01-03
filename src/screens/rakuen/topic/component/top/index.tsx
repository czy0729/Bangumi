/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 00:28:52
 */
import React from 'react'
import { systemStore } from '@stores'
import { HOST_IMAGE } from '@utils/app/ds'
import { obc } from '@utils/decorators'
import { CDN_OSS_MAGMA_PIC } from '@constants'
import { Ctx } from '../../types'
import Top from './top'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TopWrap(props, { $, navigation }: Ctx) {
  const { _replies } = $.params
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

  const styles = memoStyles()
  return (
    <Top
      navigation={navigation}
      styles={styles}
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
      monoId={$.monoId}
      isMono={$.isMono}
      delete={$.topic.delete}
    />
  )
}

export default obc(TopWrap, COMPONENT)
