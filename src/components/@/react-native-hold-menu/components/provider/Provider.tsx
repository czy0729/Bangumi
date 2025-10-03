/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:51:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 19:17:18
 */
import React, { memo, useEffect, useMemo } from 'react'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PortalProvider } from '@gorhom/portal'
import { CONTEXT_MENU_STATE } from '../../constants'
import { InternalContext } from '../../context/internal'
import { Backdrop } from '../backdrop'
import Menu from '../menu'
import { MenuInternalProps } from '../menu/types'
import { Action, StateProps } from './reducer'
import { HoldMenuProviderProps } from './types'

export interface Store {
  state: StateProps
  dispatch?: React.Dispatch<Action>
}

export let AnimatedIcon: any

const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
  paddingBottom
}: HoldMenuProviderProps) => {
  if (iconComponent) AnimatedIcon = Animated.createAnimatedComponent(iconComponent)

  const state = useSharedValue<CONTEXT_MENU_STATE>(CONTEXT_MENU_STATE.UNDETERMINED)
  const theme = useSharedValue<'light' | 'dark'>(selectedTheme || 'light')
  const menuProps = useSharedValue<MenuInternalProps>({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
    actionParams: {}
  })

  useEffect(() => {
    theme.value = selectedTheme || 'light'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme])

  const internalContextVariables = useMemo(
    () => ({
      state,
      theme,
      menuProps,

      // 底部手势功能线的高度
      paddingBottom: (paddingBottom || 0) + 24
    }),
    [state, theme, menuProps, paddingBottom]
  )

  return (
    <InternalContext.Provider value={internalContextVariables}>
      <PortalProvider>
        {children}
        <Backdrop />
        <Menu />
      </PortalProvider>
    </InternalContext.Provider>
  )
}

const Provider = memo(ProviderComponent)

export default Provider
