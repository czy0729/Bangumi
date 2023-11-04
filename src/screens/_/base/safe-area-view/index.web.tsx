/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:51:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 05:52:47
 */
import React from 'react'
import { View } from 'react-native'
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
    <View style={stl(_.container.screen, style)} {...other}>
      {children}
    </View>
  )
)
