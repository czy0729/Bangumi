/*
 * Ionicons Icons
 * @Doc: https://icons.expo.fyi/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 19:57:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@components/@/vector-icons/Ionicons'
import { _ } from '@stores'
import { Props } from './types'

export const Ionicons = observer(
  ({ style, name, size = 20, lineHeight, color, ...other }: Props) => (
    <ExpoIcon
      style={[
        {
          height: size + _.fontSizeAdjust,
          lineHeight: (lineHeight || size) + _.fontSizeAdjust
        },
        style
      ]}
      name={name}
      size={size + _.fontSizeAdjust}
      color={color || _.colorIcon}
      {...other}
    />
  )
)
