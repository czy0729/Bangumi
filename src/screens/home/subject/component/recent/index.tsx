/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 17:08:18
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_RECENT } from '../../ds'
import Split from '../split'
import Recent from './recent'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RecentWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showRecent[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-recent'>
          <View
            ref={ref => onBlockRef(ref, TITLE_RECENT)}
            style={_.container.layout}
            collapsable={false}
          />
          <Recent
            navigation={navigation}
            showRecent={systemStore.setting.showRecent}
            subjectId={$.subjectId}
            who={$.filterRecent}
            hideScore={systemStore.setting.hideScore}
            onSwitchBlock={$.onSwitchBlock}
          />
          <Split />
        </Component>
      </Suspense>
    )
  })
}

export default RecentWrap
