/*
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:25:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@components/@/vector-icons/Ionicons'
import { _ } from '@stores'
import { stl } from '@utils'
import { PropsIonicons } from './types'

/**
 * Ionicons Icons
 * @doc https://icons.expo.fyi
 */
export const Ionicons = observer(
  ({ style, name, size = 20, lineHeight, color, ...other }: PropsIonicons) => (
    <ExpoIcon
      style={stl(
        {
          height: size + _.fontSizeAdjust,
          lineHeight: (lineHeight || size) + _.fontSizeAdjust
        },
        style
      )}
      name={name}
      size={size + _.fontSizeAdjust}
      color={color || _.colorIcon}
      {...other}
    />
  )
)
