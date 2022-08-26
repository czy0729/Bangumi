/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:37:28
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Staff from './staff'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Staff')

  const { showStaff } = systemStore.setting
  if (showStaff === -1 || !$.staff.length) return null

  return (
    <Staff
      navigation={navigation}
      showStaff={systemStore.setting.showStaff}
      subjectId={$.subjectId}
      staff={$.staff}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
