/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 11:36:04
 */
import React from 'react'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Tab({ routes = [], renderScene }, { $ }: Ctx) {
  global.rerender('Home.Tab')

  const styles = memoStyles()
  const { page } = $.state
  const W_TAB = _.window.width / routes.length
  return (
    <TabView
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy={!IOS}
      lazyPreloadDistance={0}
      navigationState={{
        index: page,
        routes
      }}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          tabStyle={[
            styles.tab,
            {
              width: W_TAB
            }
          ]}
          labelStyle={styles.label}
          indicatorStyle={[
            styles.indicator,
            {
              marginLeft: (W_TAB - styles.indicator.width) / 2
            }
          ]}
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
  )
}

export default obc(Tab)
