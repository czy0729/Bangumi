/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 07:42:00
 */
import React from 'react'
import { View } from 'react-native'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import TabBarLeft from '../tab-bar-left'
import renderScene from './renderScene'
import { ROUTES } from './ds'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Tab(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { page } = $.state
  return (
    <>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        sceneContainerStyle={styles.sceneContainerStyle}
        lazy={!IOS}
        lazyPreloadDistance={0}
        navigationState={{
          index: page,
          routes: ROUTES
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            tabStyle={styles.tab}
            labelStyle={styles.label}
            indicatorStyle={styles.indicator}
            pressOpacity={1}
            pressColor='transparent'
            scrollEnabled
            renderLabel={({ route, focused }) => (
              <Flex style={styles.labelText} justify='center'>
                <Text type='title' size={13} bold={focused}>
                  {route.title}
                </Text>
              </Flex>
            )}
          />
        )}
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <View style={styles.tabBarLeft}>
        <TabBarLeft />
      </View>
    </>
  )
}

export default obc(Tab)
