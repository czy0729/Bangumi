/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:52:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:28:03
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { Ctx } from '../../types'

function PopToTop() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default PopToTop
