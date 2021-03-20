/*
 * Ionicons Icons
 * @Doc: https://icons.expo.fyi/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-20 18:07:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@components/@/vector-icons/Ionicons'
import { _ } from '@stores'

export const Icon = observer(
  ({ style, name, size = 20, lineHeight, color, ...other }) => (
    <ExpoIcon
      style={[
        {
          height: size,
          lineHeight: lineHeight || size
        },
        style
      ]}
      name={name}
      size={size}
      color={color || _.colorIcon}
      {...other}
    />
  )
)
