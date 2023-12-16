/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:19:59
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_ANITABI } from '../ds'
import { Ctx } from '../types'
import Anitabi from './anitabi'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $ }: Ctx) => {
  rerender('Subject.Anitabi')

  const { showAnitabi } = systemStore.setting
  const { anitabi } = $.state
  if (showAnitabi === -1 || !anitabi.pointsLength) return null

  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_ANITABI)} />
      <Anitabi
        styles={memoStyles()}
        showAnitabi={showAnitabi}
        subjectId={$.subjectId}
        data={anitabi}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
