/*
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:02:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Ionicons as Icons } from '@components/@'
import { _ } from '@stores'
import { stl } from '@utils'

import type { PropsIonicons } from './types'

/**
 * Ionicons Icons
 * @doc https://icons.expo.fyi
 */
function Ionicons({ style, name, size = 20, lineHeight, color, ...other }: PropsIonicons) {
  return (
    <Icons
      style={stl(
        {
          height: size,
          lineHeight: lineHeight || size
        },
        style
      )}
      name={name}
      size={size}
      color={color || _.colorIcon}
      {...other}
    />
  )
}

export default observer(Ionicons)
