/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:26:35
 */
import React, { memo } from 'react'
import { View } from 'react-native'
import Backdrop from '../backdrop'
import { MenuContext, MenuParamsContext } from '../context'
import Menu from '../menu'
import { useMenuController } from './useMenuController'
import { styles } from './styles'

import type { Props } from '../types'
export type { Props as HoldMenuProviderProps }

function ProviderComponent({ children, theme, paddingBottom }: Props) {
  const { contextValue, paramsValue } = useMenuController(theme, paddingBottom)

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuParamsContext.Provider value={paramsValue}>
        <View style={styles.flex}>
          {children}
          <Backdrop />
          <Menu />
        </View>
      </MenuParamsContext.Provider>
    </MenuContext.Provider>
  )
}

const Provider = memo(ProviderComponent)

export default Provider
