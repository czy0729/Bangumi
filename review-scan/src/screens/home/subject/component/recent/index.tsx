/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:06:13
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_RECENT } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Recent from './recent.lazy'
import { COMPONENT } from './ds'

function RecentWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
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
}

export default ob(RecentWrap, COMPONENT)
