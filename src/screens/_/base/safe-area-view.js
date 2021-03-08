/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:12:39
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const SafeAreaView = ob(
  ({
    style,
    forceInset = {
      top: 'never'
    },
    children,
    ...other
  }) => (
    <RNSafeAreaView
      style={[_.container.screen, style]}
      forceInset={forceInset}
      {...other}
    >
      {children}
    </RNSafeAreaView>
  )
)
