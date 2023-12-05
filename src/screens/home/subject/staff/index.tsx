/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:34:19
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Staff from './staff'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Staff')

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
