/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:32:13
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_LIKE } from '../../ds'
import Split from '../split'
import Like from './like'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function LikeWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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

export default observer(LikeWrap)
