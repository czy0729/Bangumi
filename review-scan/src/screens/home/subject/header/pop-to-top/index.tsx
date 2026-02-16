/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:52:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 06:57:55
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'

function PopToTop() {
  const { $, navigation } = useStore<Ctx>()
  if (!WEB) {
    try {
      if (navigation.getState().index < 4 || $.state.fixed) return null
    } catch (error) {
      return null
    }
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

export default ob(PopToTop)
