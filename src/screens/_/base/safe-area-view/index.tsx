/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 11:48:53
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
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
    <RNSafeAreaView
      style={style ? [_.container.screen, style] : _.container.screen}
      forceInset={forceInset}
      {...other}
    >
      {children}
    </RNSafeAreaView>
  )
)
