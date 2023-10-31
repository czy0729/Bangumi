/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 05:21:16
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Tags from './tags'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Subject.Tags')

  const { showTags, subjectTagsExpand, subjectTagsRec, focusOrigin } =
    systemStore.setting
  if (showTags === -1) return null

  return (
    <Tags
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      subjectType={$.subjectType}
      showTags={showTags}
      subjectTagsExpand={subjectTagsExpand}
      subjectTagsRec={subjectTagsRec}
      rank={$.subject.rank}
      focusOrigin={focusOrigin}
      tag={$.collection.tag}
      tags={$.tags}
      animeTags={$.animeTags}
      hentaiTags={$.hentaiTags}
      gameTags={$.gameTags}
      mangaTags={$.mangaTags}
      wenkuTags={$.wenkuTags}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
