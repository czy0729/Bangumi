/*
 * @Author: czy0729
 * @Date: 2020-09-24 16:31:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:56:06
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { TextStyle, ViewStyle } from '@types'
import { Component } from '../component'
import { TabBar } from '../@/react-native-tab-view/TabBar'
import { TabView } from '../@/react-native-tab-view/TabView'
import { Flex } from '../flex'
import { Text } from '../text'
import { ANDROID_RIPPLE, COMPONENT } from './ds'
import { memoStyles, W_INDICATOR } from './styles'
import { Props as TabsV2Props } from './types'

export { TabsV2Props, TabView, TabBar, SceneMap }

/** 通用选项卡 */
export const TabsV2 = ({
  routes = [],
  tabBarLength,
  page = 0,
  lazy = true,
  textColor,
  backgroundColor,
  borderBottomColor,
  underlineColor,
  renderItem,
  renderLabel,
  onChange = FROZEN_FN,
  ...other
}: TabsV2Props) => {
  r(COMPONENT)

  const styles = memoStyles()
  const renderScene = useMemo(
    () =>
      SceneMap(
        Object.assign(
          {},
          ...routes.map((item: any, index: number) => ({
            [item.key]: () => renderItem(item, index)
          }))
        )
      ),
    [renderItem, routes]
  )

  const W_TAB = useMemo(() => {
    const length = tabBarLength || routes.length
    if (length >= 10) return _.window.width / 3.6
    return _.window.width / length
  }, [tabBarLength, routes])
  const tabBarStyle = useMemo<ViewStyle>(
    () => [
      styles.tabBar,
      backgroundColor && {
        backgroundColor
      },
      borderBottomColor && {
        borderBottomColor
      }
    ],
    [styles, backgroundColor, borderBottomColor]
  )
  const tabStyle = useMemo<ViewStyle>(
    () => [
      styles.tab,
      {
        width: W_TAB
      }
    ],
    [styles, W_TAB]
  )
  const indicatorStyle = useMemo<ViewStyle>(
    () => [
      styles.indicator,
      {
        marginLeft: (W_TAB - W_INDICATOR) / 2
      },
      underlineColor && {
        backgroundColor: underlineColor
      }
    ],
    [styles, W_TAB, underlineColor]
  )
  const textStyle = useMemo<TextStyle>(
    () =>
      textColor
        ? {
            color: textColor
          }
        : undefined,
    [textColor]
  )

  return (
    <Component id='component-tabs'>
      <TabView
        lazy={lazy}
        lazyPreloadDistance={0}
        navigationState={{
          index: page,
          // @ts-expect-error
          routes
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={tabBarStyle}
            tabStyle={tabStyle}
            labelStyle={styles.label}
            indicatorStyle={indicatorStyle}
            pressOpacity={1}
            pressColor='transparent'
            scrollEnabled
            android_ripple={ANDROID_RIPPLE}
            renderLabel={
              renderLabel ||
              (({ route, focused }) => (
                <Flex style={styles.labelText} justify='center'>
                  <Text style={textStyle} type='title' size={13} bold={focused}>
                    {route.title}
                  </Text>
                </Flex>
              ))
            }
          />
        )}
        renderScene={renderScene}
        onIndexChange={onChange}
        {...other}
      />
    </Component>
  )
}

export default TabsV2
