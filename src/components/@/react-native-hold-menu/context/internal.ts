/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:51:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:51:14
 */
import { createContext } from 'react'
import { MenuInternalProps } from '../components/menu/types'

import type Animated from 'react-native-reanimated'
import type { CONTEXT_MENU_STATE } from '../constants'
export type InternalContextType = {
  state: Animated.SharedValue<CONTEXT_MENU_STATE>
  theme: Animated.SharedValue<'light' | 'dark'>
  menuProps: Animated.SharedValue<MenuInternalProps>
  paddingBottom: number
}

// @ts-ignore
export const InternalContext = createContext<InternalContextType>()
