/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:30:52
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_TAGS } from '../ds'
import { Ctx } from '../types'
import Tags from './tags'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Tags')

  if (!$.showTags[1]) return null

  const { showTags, subjectTagsExpand, subjectTagsRec, focusOrigin } =
    systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_TAGS)} />
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
    </>
  )
})
