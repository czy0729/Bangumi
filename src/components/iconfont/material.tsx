/*
 * @Author: czy0729
 * @Date: 2021-03-18 11:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:02:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Material as Icons } from '@components/@'
import { _ } from '@stores'
import { stl } from '@utils'

import type { PropsMaterial } from './types'

function Material({ style, name, size = 22, lineHeight, color, ...other }: PropsMaterial) {
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

export default observer(Material)
