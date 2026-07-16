/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:42:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:31:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, SafeAreaBottom } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { IOS } from '@constants'
import { routesConfig } from './config'
import TabBarItem, { EVENT_APP_TAB_PRESS } from './item'
import { styles } from './styles'

export { EVENT_APP_TAB_PRESS }

import type { Props } from './types'

function TabBar({ state, descriptors, navigation }: Props) {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  if (focusedOptions.tabBarVisible === false) return null

  return (
    <SafeAreaBottom style={_.ios(styles.tabBar, undefined)} type={_.ios('height', 'bottom')}>
      <Flex style={styles.tabBar} align={_.ios('start', 'center')}>
        {IOS && <BlurView style={_.absoluteFill} />}
        {state.routes.map((route, index: number) => (
          <TabBarItem
            key={route.name}
            navigation={navigation}
            route={route}
            length={state.routes.length}
            config={routesConfig[route.name]}
            isFocused={state.index === index}
          />
        ))}
      </Flex>
    </SafeAreaBottom>
  )
}

export default observer(TabBar)
