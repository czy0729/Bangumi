/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:22:04
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as SafeAreaViewProps } from './types'
export type { SafeAreaViewProps }

export const SafeAreaView = observer(
  ({
    style,
    forceInset = {
      top: 'never'
    },
    children,
    ...other
  }: SafeAreaViewProps) => {
    r(COMPONENT)

    return (
      <RNSafeAreaView style={stl(_.container.screen, style)} forceInset={forceInset} {...other}>
        {children}
      </RNSafeAreaView>
    )
  }
)

export default SafeAreaView
