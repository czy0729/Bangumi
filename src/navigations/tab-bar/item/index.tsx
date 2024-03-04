/*
 * @Author: czy0729
 * @Date: 2024-03-03 16:47:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 21:13:22
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { WSA } from '@constants'
import { Navigation } from '@types'
import { RoutesConfig, State } from '../types'
import { styles } from './styles'

export const EVENT_APP_TAB_PRESS = 'appTabPress'

function TabBarItem({
  navigation,
  route,
  length,
  config,
  isFocused
}: {
  navigation: Navigation
  route: State['routes'][number]
  length: number
  config: RoutesConfig[number]
  isFocused: boolean
}) {
  const isHorizontal = WSA || _.isPad || _.isLandscape
  return (
    <Touchable
      style={[
        styles.item,
        {
          width: _.window.width / length
        }
      ]}
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
      <Flex style={styles.item} direction={isHorizontal ? undefined : 'column'} justify='center'>
        <Flex style={styles.icon} justify='center'>
          <Iconfont
            name={config.icon}
            size={config.size || 24}
            color={isFocused ? _.colorMain : _.colorDesc}
          />
        </Flex>
        {isFocused && (
          <Text style={isHorizontal && _.ml.sm} type={isFocused ? 'main' : 'desc'} size={12}>
            {config.label}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

export default ob(TabBarItem)
