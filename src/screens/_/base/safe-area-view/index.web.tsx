/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:51:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:22:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'

import type { Props as SafeAreaViewProps } from './types'
export type { SafeAreaViewProps }

/** @todo */
export const SafeAreaView = observer(
  ({
    style,
    /** @todo */
    forceInset,
    children,
    ...other
  }: SafeAreaViewProps) => {
    return (
      <Component id='base-safe-area-view' style={stl(_.container.screen, style)} {...other}>
        {children}
      </Component>
    )
  }
)

export default SafeAreaView
