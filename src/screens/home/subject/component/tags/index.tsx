/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 07:15:20
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_TAGS } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Tags from './tags'
import { COMPONENT } from './ds'

function TagsWrap({ onBlockRef }) {
  const { $ } = useStore<Ctx>()
  if (!$.showTags[1]) return null

  return (
    <Component id='screen-subject-tags'>
      <View
        ref={ref => onBlockRef(ref, TITLE_TAGS)}
        style={_.container.layout}
        collapsable={false}
      />
      <Tags
        show={systemStore.setting.showTags && !!$.tags.length}
        showTags={systemStore.setting.showTags}
        showTyperank={!!$.rank && systemStore.setting.subjectTagsRec}
        subjectTagsExpand={systemStore.setting.subjectTagsExpand}
        rank={$.rank}
        focusOrigin={systemStore.setting.focusOrigin}
        onSwitchBlock={$.onSwitchBlock}
      />
      <Split
        style={{
          marginTop: 0,
          marginBottom: 24
        }}
      />
    </Component>
  )
}

export default ob(TagsWrap, COMPONENT)
