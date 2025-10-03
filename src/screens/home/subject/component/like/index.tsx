/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 05:45:12
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_LIKE } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Like from './like'
import { COMPONENT } from './ds'
import { Props } from './types'

function LikeWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default LikeWrap
