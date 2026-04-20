/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:27:00
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_RECENT } from '../../ds'
import Split from '../split'
import Recent from './recent'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RecentWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  if (!$.showRecent[1]) return null

  const { showRecent, hideScore, subjectRecentType } = systemStore.setting

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
          showRecent={showRecent}
          subjectId={$.subjectId}
          who={subjectRecentType === '好友' ? $.friendsRating : $.filterRecent}
          hideScore={hideScore}
          subjectRecentType={subjectRecentType}
          onSwitchBlock={$.onSwitchBlock}
          onSwitchSubjectRecentType={$.onSwitchSubjectRecentType}
        />

        <Split />
      </Component>
    </Suspense>
  )
}

export default observer(RecentWrap)
