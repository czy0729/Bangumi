/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:42:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 20:41:54
 */
import React from 'react'
import { SafeAreaBottom, Flex, Touchable, Iconfont, Text } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS, WSA } from '@constants'
import { Navigation } from '@types'
import { routesConfig } from './config'
import { memoStyles } from './styles'
import { Descriptors, State } from './types'

export const EVENT_APP_TAB_PRESS = 'appTabPress'

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
  const style = [
    styles.item,
    {
      width: _.window.width / state.routes.length
    }
  ]
  return (
    <SafeAreaBottom>
      <Flex style={styles.tabBar}>
        {IOS && <BlurView style={_.absoluteFill} />}
        {state.routes.map((route, index: number) => {
          const isHorizontal = WSA || _.isPad || _.isLandscape
          const isFocused = state.index === index
          const config = routesConfig[route.name]
          return (
            <Touchable
              key={route.name}
              style={style}
              animate
              scale={0.9}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true
                })

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name as any)
                } else if (isFocused && !event.defaultPrevented) {
                  // 通知点击了底栏
                  navigation.emit({
                    type: `${EVENT_APP_TAB_PRESS}|${route.name}`,
                    target: route.key,
                    canPreventDefault: true
                  })
                }
              }}
            >
              <Flex
                style={styles.item}
                direction={isHorizontal ? undefined : 'column'}
                justify='center'
              >
                <Flex style={styles.icon} justify='center'>
                  <Iconfont
                    name={config.icon}
                    size={config.size || 24}
                    color={isFocused ? _.colorMain : _.colorDesc}
                  />
                </Flex>
                {isFocused && (
                  <Text
                    style={isHorizontal && _.ml.sm}
                    type={isFocused ? 'main' : 'desc'}
                    size={12}
                  >
                    {config.label}
                  </Text>
                )}
              </Flex>
            </Touchable>
          )
        })}
      </Flex>
    </SafeAreaBottom>
  )
}

export default ob(TabBar)
