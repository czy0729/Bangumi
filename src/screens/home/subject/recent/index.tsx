/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 10:34:12
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_RECENT } from '../ds'
import { Ctx } from '../types'
import Recent from './recent'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Recent')

  if (!$.showRecent[1]) return null

  const { showRecent } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_RECENT)} />
      <Recent
        navigation={navigation}
        showRecent={showRecent}
        subjectId={$.subjectId}
        who={$.filterRecent}
        hideScore={$.hideScore}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
