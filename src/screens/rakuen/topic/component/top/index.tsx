/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 09:44:52
 */
import React from 'react'
import { systemStore } from '@stores'
import { getGroupThumbStatic } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { obc } from '@utils/decorators'
import { CDN_OSS_MAGMA_PIC, CDN_OSS_MAGMA_POSTER } from '@constants'
import { Ctx } from '../../types'
import Top from './top'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TopWrap(_props, { $, navigation }: Ctx) {
  let groupThumb = getGroupThumbStatic($.groupThumb)
  if (
    typeof groupThumb === 'string' &&
    systemStore.setting.cdn &&
    systemStore.setting.cdnOrigin === 'magma' &&
    groupThumb.includes(HOST_IMAGE)
  ) {
    if (groupThumb.includes('pic/cover')) {
      groupThumb = CDN_OSS_MAGMA_POSTER(groupThumb.replace('/s/', '/l/'), 'bgm_poster_100')
    } else {
      groupThumb = CDN_OSS_MAGMA_PIC(groupThumb)
    }
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
      replies={$.params._replies}
      group={$.group}
      groupHref={$.groupHref}
      groupThumb={groupThumb}
      groupThumbFallback={$.groupThumb}
      avatar={$.avatar}
      userId={$.userId}
      userName={$.userName}
      userSign={$.userSign}
      filterPost={$.state.filterPost}
      monoId={$.monoId}
      isMono={$.isMono}
      delete={$.topic.delete}
    />
  )
}

export default obc(TopWrap, COMPONENT)
