/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:42:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:18:04
 */
import React from 'react'
import { Flex, Touchable, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { routesConfig } from './config'

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  if (focusedOptions.tabBarVisible === false) return null

  const styles = memoStyles()
  return (
    <Flex style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const config = routesConfig[route.name]
        return (
          <Touchable
            key={route.name}
            style={[
              styles.item,
              {
                width: _.window.width / state.routes.length
              }
            ]}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }}
            // onLongPress={() => {
            //   navigation.emit({
            //     type: 'tabLongPress',
            //     target: route.key
            //   })
            // }}
          >
            <Flex style={styles.item} direction='column' justify='center'>
              <Flex style={styles.icon} justify='center'>
                <Iconfont
                  name={config.icon}
                  size={config.size || 24}
                  color={isFocused ? _.colorMain : _.colorDesc}
                />
              </Flex>
              {isFocused && (
                <Text type={isFocused ? 'main' : 'desc'} size={12}>
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

const memoStyles = _.memoStyles(() => ({
  tabBar: {
    height: _.tabBarHeight,
    backgroundColor: _.ios(
      _.select(_.colorPlain, _._colorDarkModeLevel1),
      _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
    ),
    borderTopWidth: _.ios(0, _.select(_.hairlineWidth, 0)),
    borderTopColor: _.colorBorder
  },
  item: {
    height: 50
  },
  icon: {
    width: 24,
    height: 24
  }
}))
