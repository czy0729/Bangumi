/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:02:05
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Info from './info'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Info')

  const { showInfo } = systemStore.setting
  if (showInfo === -1) return null

  return (
    <Info
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      showInfo={showInfo}
      info={$.info}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
