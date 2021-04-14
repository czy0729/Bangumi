/*
 * @Author: czy0729
 * @Date: 2019-12-11 01:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 17:49:22
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const HeaderBackground = ob(({ style, children, ...other }) => (
  <View
    style={[
      style,
      {
        backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
      }
    ]}
    {...other}
  >
    {children}
  </View>
))
