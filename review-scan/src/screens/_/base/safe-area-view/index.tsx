/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:39:56
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props as SafeAreaViewProps } from './types'

export { SafeAreaViewProps }

export const SafeAreaView = ob(
  ({
    style,
    forceInset = {
      top: 'never'
    },
    children,
    ...other
  }: SafeAreaViewProps) => (
    <RNSafeAreaView style={stl(_.container.screen, style)} forceInset={forceInset} {...other}>
      {children}
    </RNSafeAreaView>
  ),
  COMPONENT
)

export default SafeAreaView
