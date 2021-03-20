/*
 * @Author: czy0729
 * @Date: 2021-03-18 11:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 11:41:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@expo/vector-icons/MaterialIcons'
import { _ } from '@stores'

export const MD = observer(
  ({ style, name, size = 22, lineHeight, color, ...other }) => (
    <Icons
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
