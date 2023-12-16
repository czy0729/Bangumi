/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:47:40
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_STAFF } from '../ds'
import { Ctx } from '../types'
import Staff from './staff'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Staff')

  const { showStaff } = systemStore.setting
  if (showStaff === -1 || !$.staff.length) return null

  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_STAFF)} />
      <Staff
        navigation={navigation}
        showStaff={systemStore.setting.showStaff}
        subjectId={$.subjectId}
        staff={$.staff}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
