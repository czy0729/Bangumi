/*
 * @Author: czy0729
 * @Date: 2023-10-21 05:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 14:13:25
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { Component } from '../component'
import { Props as SafeAreaBottomProps } from './types'

export { SafeAreaBottomProps }

export const SafeAreaBottom = ({
  style,
  type = 'bottom',
  children,
  ...other
}: SafeAreaBottomProps) => {
  const bottom = 0
  return useObserver(() => (
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
  ))
}
