/*
 * @Author: czy0729
 * @Date: 2023-10-21 05:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:07:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { COMPONENT } from './ds'

import type { Props as SafeAreaBottomProps } from './types'
export type { SafeAreaBottomProps }

export const SafeAreaBottom = observer(
  ({ style, type = 'bottom', children, ...other }: SafeAreaBottomProps) => {
    r(COMPONENT)

    const bottom = 0

    return (
      <Component
        id='component-safe-area-bottom'
        style={stl(style, {
          [type]:
            type === 'height'
              ? // @ts-expect-error
                bottom + style?.height || 0
              : bottom
        })}
        {...other}
      >
        {children}
      </Component>
    )
  }
)

export default SafeAreaBottom
