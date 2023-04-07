/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-12 08:38:26
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Anitabi from './anitabi'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  // global.rerender('Subject.Anitabi')

  const { showAnitabi } = systemStore.setting
  const { anitabi } = $.state
  if (showAnitabi === -1 || !anitabi.pointsLength) return null

  return (
    <Anitabi
      styles={memoStyles()}
      showAnitabi={showAnitabi}
      subjectId={$.subjectId}
      data={anitabi}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
