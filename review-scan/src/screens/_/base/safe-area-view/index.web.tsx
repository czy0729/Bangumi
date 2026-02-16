/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:51:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:52:21
 */
import React from 'react'
import { Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Props as SafeAreaViewProps } from './types'

export { SafeAreaViewProps }

/** @todo */
export const SafeAreaView = ob(
  ({
    style,
    /** @todo */
    forceInset,
    children,
    ...other
  }: SafeAreaViewProps) => (
    <Component id='base-safe-area-view' style={stl(_.container.screen, style)} {...other}>
      {children}
    </Component>
  )
)

export default SafeAreaView
