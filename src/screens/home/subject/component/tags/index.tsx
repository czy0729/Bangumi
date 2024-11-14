/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:09:32
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_TAGS } from '../../ds'
import { Ctx } from '../../types'
import Tags from './tags'
import { COMPONENT } from './ds'

function TagsWrap({ onBlockRef }) {
  const { $ } = useStore<Ctx>()
  if (!$.showTags[1]) return null

  return (
    <Component id='screen-subject-tags'>
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
    </Component>
  )
}

export default ob(TagsWrap, COMPONENT)
