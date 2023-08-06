/*
 * 通用选项卡
 * @Author: czy0729
 * @Date: 2020-09-24 16:31:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-03 01:48:11
 */
import React, { useMemo } from 'react'
import { SceneMap, TabBar } from 'react-native-tab-view'
import { _ } from '@stores'
import { stl } from '@utils'
import { TextStyle, ViewStyle } from '@types'
import { TabView } from '../@/react-native-tab-view/TabView'
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
  const tabWidth = useMemo(() => {
    const length = tabBarLength || routes.length
    if (length >= 10) return _.window.width / 3.6
    return _.window.width / length
  }, [tabBarLength, routes])
  const tabBarStyle = useMemo<ViewStyle>(
    () =>
      stl(
        styles.tabBar,
        backgroundColor && {
          backgroundColor
        },
        borderBottomColor && {
          borderBottomColor
        }
      ),
    [styles, backgroundColor, borderBottomColor]
  )
  const tabStyle = useMemo<ViewStyle>(
    () => [
      styles.tab,
      {
        width: tabWidth
      }
    ],
    [styles, tabWidth]
  )
  const indicatorStyle = useMemo<ViewStyle>(
    () =>
      stl(
        styles.indicator,
        {
          marginLeft: (tabWidth - W_INDICATOR) / 2
        },
        underlineColor && {
          backgroundColor: underlineColor
        }
      ),
    [styles, tabWidth, underlineColor]
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
