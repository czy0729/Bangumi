/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:30:04
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RECENT } from '../../ds'
import { Ctx } from '../../types'
import Recent from './recent'
import { COMPONENT } from './ds'

function RecentWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showRecent[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RECENT)} />
      <Recent
        navigation={navigation}
        showRecent={systemStore.setting.showRecent}
        subjectId={$.subjectId}
        who={$.filterRecent}
        hideScore={$.hideScore}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(RecentWrap, COMPONENT)
