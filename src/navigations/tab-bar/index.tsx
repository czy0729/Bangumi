/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:42:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 21:13:32
 */
import React from 'react'
import { Flex, SafeAreaBottom } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Navigation } from '@types'
import { routesConfig } from './config'
import TabBarItem, { EVENT_APP_TAB_PRESS } from './item'
import { memoStyles } from './styles'
import { Descriptors, State } from './types'

export { EVENT_APP_TAB_PRESS }

function TabBar({
  state,
  descriptors,
  navigation
}: {
  state: State
  descriptors: Descriptors
  navigation: Navigation
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  if (focusedOptions.tabBarVisible === false) return null

  const styles = memoStyles()
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

export default ob(TabBar)
