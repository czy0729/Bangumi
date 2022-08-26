/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:37:53
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import Tags from './tags'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Tags')

  const { showTags } = systemStore.setting
  if (showTags === -1) return null

  return (
    <Tags
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      subjectType={$.subjectType}
      showTags={showTags}
      tag={$.collection.tag}
      tags={$.tags}
      animeTags={$.animeInfo?.tags}
      hentaiTags={$.hentaiInfo?.tags}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
