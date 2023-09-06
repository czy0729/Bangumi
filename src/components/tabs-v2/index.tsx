/*
 * 通用选项卡
 * @Author: czy0729
 * @Date: 2020-09-24 16:31:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-23 14:46:29
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { _ } from '@stores'
import { TextStyle, ViewStyle } from '@types'
import { TabView } from '../@/react-native-tab-view/TabView'
import { TabBar } from '../@/react-native-tab-view/TabBar'
import { Flex } from '../flex'
import { Text } from '../text'
import { W_INDICATOR, memoStyles } from './styles'
import { Props as TabsV2Props } from './types'

export { TabsV2Props, TabView, TabBar, SceneMap }

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
  onChange = () => {},
  ...other
}: TabsV2Props) => {
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
  )
}
