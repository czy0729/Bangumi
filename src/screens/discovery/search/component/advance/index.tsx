/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 09:41:19
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Advance from './advance'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AdvanceWrap(_props, { $, navigation }: Ctx) {
  if (!$.showAdvance) return null

  return (
    <Advance
      navigation={navigation}
      styles={memoStyles()}
      cat={$.state.cat}
      value={$.state.value}
      onSubmit={(text: string) => $.onAdvance(text, navigation)}
    />
  )
}

export default obc(AdvanceWrap, COMPONENT)
