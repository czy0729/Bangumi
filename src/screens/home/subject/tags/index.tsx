/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 18:32:28
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Tags from './tags'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Tags')

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
      rank={$.rank}
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
