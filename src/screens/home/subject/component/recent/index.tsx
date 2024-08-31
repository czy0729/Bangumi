/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-31 13:59:57
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
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
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RECENT)} />
      <Recent
        navigation={navigation}
        showRecent={systemStore.setting.showRecent}
        subjectId={$.subjectId}
        who={$.filterRecent}
        hideScore={systemStore.setting.hideScore}
        onSwitchBlock={$.onSwitchBlock}
      />
    </Suspense>
  )
}

export default obc(RecentWrap, COMPONENT)
