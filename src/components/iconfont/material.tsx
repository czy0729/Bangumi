/*
 * @Author: czy0729
 * @Date: 2021-03-18 11:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:25:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@components/@/vector-icons/MaterialIcons'
import { _ } from '@stores'
import { stl } from '@utils'
import { PropsMaterial } from './types'

export const Material = observer(
  ({ style, name, size = 22, lineHeight, color, ...other }: PropsMaterial) => (
    <ExpoIcon
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
)
