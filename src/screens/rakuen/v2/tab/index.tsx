/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 10:58:44
 */
import React from 'react'
import TabView from '@components/@/react-native-tab-view/TabView'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO, IOS } from '@constants'
import Label from '../label'
import { Ctx } from '../types'
import { renderScene, TABS } from './ds'
import { memoStyles } from './styles'

function Tab(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { page, group, mono } = $.state
  return (
    <TabView
      key={_.orientation}
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy={!IOS}
      lazyPreloadDistance={0}
      navigationState={{
        index: page,
        routes: TABS
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
          renderLabel={({ route, focused }) => {
            if (route.title === '小组' && TABS[page].title === '小组') {
              return (
                <Label
                  focused={focused}
                  model={MODEL_RAKUEN_TYPE_GROUP}
                  label='小组'
                  value={group}
                />
              )
            }

            if (route.title === '人物' && TABS[page].title === '人物') {
              return (
                <Label
                  focused={focused}
                  model={MODEL_RAKUEN_TYPE_MONO}
                  label='人物'
                  value={mono}
                />
              )
            }

            return (
              <Flex style={styles.labelText} justify='center'>
                <Text type='title' size={13} bold={focused}>
                  {route.title}
                </Text>
              </Flex>
            )
          }}
        />
      )}
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default obc(Tab)
