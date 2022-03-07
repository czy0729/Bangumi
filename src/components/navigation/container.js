/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 22:59:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import {
  NavigationContainer as NContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { _ } from '@stores'

export const NavigationContainer = observer(({ children }) => (
  <NContainer theme={_.isDark ? DarkTheme : DefaultTheme}>{children}</NContainer>
))
