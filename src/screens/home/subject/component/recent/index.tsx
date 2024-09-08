/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:49:46
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RECENT } from '../../ds'
import { Ctx } from '../../types'
import Recent from './recent.lazy'
import { COMPONENT } from './ds'

function RecentWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showRecent[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-recent'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RECENT)} />
        <Recent
          navigation={navigation}
          showRecent={systemStore.setting.showRecent}
          subjectId={$.subjectId}
          who={$.filterRecent}
          hideScore={systemStore.setting.hideScore}
          onSwitchBlock={$.onSwitchBlock}
        />
      </Component>
    </Suspense>
  )
}

export default obc(RecentWrap, COMPONENT)
