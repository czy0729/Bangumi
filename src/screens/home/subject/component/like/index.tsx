/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:03:29
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_LIKE } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Like from './like.lazy'
import { COMPONENT } from './ds'

function LikeWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showLike[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-like'>
        <View
          ref={ref => onBlockRef(ref, TITLE_LIKE)}
          style={_.container.layout}
          collapsable={false}
        />
        <Like
          navigation={navigation}
          showLike={systemStore.setting.showLike}
          subjectId={$.subjectId}
          like={$.like}
          typeCn={$.type}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split />
      </Component>
    </Suspense>
  )
}

export default ob(LikeWrap, COMPONENT)
