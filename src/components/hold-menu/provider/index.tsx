/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:49:40
 */
import { memo } from 'react'
import { View } from 'react-native'
import { MenuContext, MenuParamsContext, MenuShowContext } from '../context'
import MenuLayer from './menu-layer'
import { useMenuController } from './useMenuController'
import { styles } from './styles'

import type { Props } from '../types'
export type { Props as HoldMenuProviderProps }

function ProviderComponent({ children, theme, paddingBottom }: Props) {
  const { contextValue, paramsValue, show } = useMenuController(theme, paddingBottom)

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuParamsContext.Provider value={paramsValue}>
        <MenuShowContext.Provider value={show}>
          <View style={styles.flex}>
            {children}
            <MenuLayer />
          </View>
        </MenuShowContext.Provider>
      </MenuParamsContext.Provider>
    </MenuContext.Provider>
  )
}

const Provider = memo(ProviderComponent)

export default Provider
