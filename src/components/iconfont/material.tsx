/*
 * @Author: czy0729
 * @Date: 2021-03-18 11:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 10:08:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@components/@/vector-icons/MaterialIcons'
import { _ } from '@stores'
import { Override } from '@types'
import { Props, MaterialIconsNames } from './types'

type PropsMaterial = Override<
  Props,
  {
    name: MaterialIconsNames
  }
>

export const Material = observer(
  ({ style, name, size = 22, lineHeight, color, ...other }: PropsMaterial) => (
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
