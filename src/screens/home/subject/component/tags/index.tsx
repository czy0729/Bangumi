/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 12:13:14
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_TAGS } from '../../ds'
import { Ctx } from '../../types'
import Tags from './tags'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TagsWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showTags[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_TAGS)} />
      <Tags
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        subjectType={$.subjectType}
        showTags={systemStore.setting.showTags}
        subjectTagsExpand={systemStore.setting.subjectTagsExpand}
        subjectTagsRec={systemStore.setting.subjectTagsRec}
        rank={$.rank}
        focusOrigin={systemStore.setting.focusOrigin}
        tag={$.collection.tag}
        tags={$.tags}
        animeTags={$.animeTags}
        // hentaiTags={$.hentaiTags}
        gameTags={$.gameTags}
        mangaTags={$.mangaTags}
        wenkuTags={$.wenkuTags}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(TagsWrap, COMPONENT)
