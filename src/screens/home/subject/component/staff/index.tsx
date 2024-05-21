/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-21 21:08:38
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_STAFF } from '../../ds'
import { Ctx } from '../../types'
import Staff from './staff'
import { COMPONENT } from './ds'

function StaffWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showStaff[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_STAFF)} />
      <Staff
        navigation={navigation}
        showStaff={systemStore.setting.showStaff}
        subjectId={$.subjectId}
        staff={$.staff}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(StaffWrap, COMPONENT)
