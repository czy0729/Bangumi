/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:52:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 04:09:35
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function PopToTop(props, { $, navigation }: Ctx) {
  try {
    if (navigation.getState().index < 4 || $.state.fixed) return null
  } catch (error) {
    return null
  }

  return (
    <IconTouchable
      name='icon-home'
      size={19}
      color={_.__colorPlain__}
      onPress={() => {
        navigation.popToTop()
      }}
    />
  )
}
export default obc(PopToTop)
