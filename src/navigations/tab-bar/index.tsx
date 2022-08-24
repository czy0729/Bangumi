/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:42:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 05:57:19
 */
import React from 'react'
import { Flex, Touchable, Iconfont, Text } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Navigation } from '@types'
import { routesConfig } from './config'
import { memoStyles } from './styles'
import { Descriptors, Route, State } from './types'

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
    <Flex style={styles.tabBar} align='start'>
      {IOS && <BlurView style={styles.blurView} />}
      {state.routes.map((route: Route, index: number) => {
        const isFocused = state.index === index
        const config = routesConfig[route.name]
        return (
          <Touchable
            key={route.name}
            style={style}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              } else if (isFocused && !event.defaultPrevented) {
                // 通知点击了底栏
                navigation.emit({
                  type: `${EVENT_APP_TAB_PRESS}|${route.name}`,
                  target: route.key,
                  canPreventDefault: true
                })
              }
            }}
            // onLongPress={() => {
            //   navigation.emit({
            //     type: 'tabLongPress',
            //     target: route.key
            //   })
            // }}
          >
            <Flex
              style={styles.item}
              direction={_.isLandscape ? undefined : 'column'}
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
                  style={_.isLandscape && _.ml.sm}
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
  )
}

export default ob(TabBar)
