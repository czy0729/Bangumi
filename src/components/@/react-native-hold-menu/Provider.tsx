// @ts-nocheck

import React, { memo, useEffect, useMemo } from 'react'
import { PortalProvider } from '@gorhom/portal'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { InternalContext } from 'react-native-hold-menu/src/context/internal'

// Components
import Backdrop from './Backdrop'

// Utils
import { HoldMenuProviderProps } from 'react-native-hold-menu/src/components/provider/types'
import {
  StateProps,
  Action
} from 'react-native-hold-menu/src/components/provider/reducer'
import { CONTEXT_MENU_STATE } from 'react-native-hold-menu/src/constants'
import { MenuInternalProps } from 'react-native-hold-menu/src/components/menu/types'
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
