/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-11 08:25:45
 */
import React, { memo, useEffect, useMemo } from 'react'
import { MenuInternalProps } from 'react-native-hold-menu/src/components/menu/types'
import { Action, StateProps } from 'react-native-hold-menu/src/components/provider/reducer'
import { HoldMenuProviderProps } from 'react-native-hold-menu/src/components/provider/types'
import { CONTEXT_MENU_STATE } from 'react-native-hold-menu/src/constants'
import { InternalContext } from 'react-native-hold-menu/src/context/internal'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PortalProvider } from '@gorhom/portal'
import Backdrop from './Backdrop'
import Menu from './Menu'

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
