/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 04:39:24
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_TAGS } from '../../ds'
import { Ctx } from '../../types'
import Tags from './tags'
import { COMPONENT } from './ds'

function TagsWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showTags[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_TAGS)} />
      <Tags
        show={systemStore.setting.showTags && !!$.tags.length}
        showTags={systemStore.setting.showTags}
        showTyperank={!!$.rank && systemStore.setting.subjectTagsRec}
        subjectTagsExpand={systemStore.setting.subjectTagsExpand}
        rank={$.rank}
        focusOrigin={systemStore.setting.focusOrigin}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(TagsWrap, COMPONENT)
