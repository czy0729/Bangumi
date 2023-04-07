/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 06:45:55
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import Tags from './tags'

// function slice(target: any) {
//   return target?.length ? target.slice() : target
// }

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Subject.Tags')

  const { showTags, subjectTagsExpand } = systemStore.setting
  if (showTags === -1) return null

  return (
    <Tags
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      subjectType={$.subjectType}
      showTags={showTags}
      subjectTagsExpand={subjectTagsExpand}
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
