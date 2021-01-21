/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:05:15
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import { Flex, Text } from '@components'
import { BlurView, Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import {
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO
} from '@constants/model'
import List from './list'
import { H_TABBAR } from './store'

const routes = MODEL_RAKUEN_TYPE.data
  .map(item => ({
    title: item.label,
    key: item.value
  }))
  .filter(item => !!item.title)
const renderScene = SceneMap(
  Object.assign(
    {},
    ...routes.map((item, index) => ({
      [item.key]: () =>
        index === routes.length - 1 ? (
          <>
            <List index={index} />
            {IOS && (
              <BlurView
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 0,
                  left: -_.window.width * routes.length,
                  right: 0,
                  height: _.headerHeight + H_TABBAR
                }}
              />
            )}
          </>
        ) : (
          <List index={index} />
        )
    }))
  )
)

function Tab(props, { $ }) {
  const styles = memoStyles()
  const { page, group, mono } = $.state
  return (
    <TabView
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy={!IOS}
      lazyPreloadDistance={1}
      navigationState={{
        index: page,
        routes
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
            if (route.title === '小组' && routes[page].title === '小组') {
              return (
                <Popover
                  style={styles.labelText}
                  data={MODEL_RAKUEN_TYPE_GROUP.data.map(item => item.label)}
                  onSelect={$.onGroupMenuPress}
                >
                  <Flex style={styles.labelText} justify='center'>
                    <Text type='title' size={13} bold={focused}>
                      小组
                    </Text>
                    <Text size={11} lineHeight={13} type='sub'>
                      {' '}
                      {MODEL_RAKUEN_TYPE_GROUP.getLabel(group)}{' '}
                    </Text>
                  </Flex>
                </Popover>
              )
            }

            if (route.title === '人物' && routes[page].title === '人物') {
              return (
                <Popover
                  style={styles.labelText}
                  data={MODEL_RAKUEN_TYPE_GROUP.data.map(item => item.label)}
                  onSelect={$.onGroupMenuPress}
                >
                  <Flex style={styles.labelText} justify='center'>
                    <Text type='title' size={13} bold={focused}>
                      人物
                    </Text>
                    <Text size={11} lineHeight={13} type='sub'>
                      {' '}
                      {MODEL_RAKUEN_TYPE_MONO.getLabel(mono)}{' '}
                    </Text>
                  </Flex>
                </Popover>
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

const W_TAB_BAR_LEFT = 0
const W_TAB = _.window.width / 5
const W_INDICATOR = 16
const TOP_TAB_BAR = _.headerHeight - (IOS ? 18 : 24)
const memoStyles = _.memoStyles(_ => ({
  tabBar: {
    paddingTop: TOP_TAB_BAR,
    paddingLeft: W_TAB_BAR_LEFT,
    backgroundColor: IOS
      ? 'transparent'
      : _.select('transparent', _._colorDarkModeLevel1),
    borderBottomWidth: IOS ? 0 : _.select(_.hairlineWidth, 0),
    borderBottomColor: _.colorBorder,
    elevation: 0
  },
  tab: {
    width: W_TAB,
    height: 48
  },
  label: {
    padding: 0
  },
  labelText: {
    width: '100%'
  },
  indicator: {
    width: W_INDICATOR,
    height: 4,
    marginLeft: (W_TAB - W_INDICATOR) / 2 + W_TAB_BAR_LEFT,
    backgroundColor: _.colorMain,
    borderRadius: 4
  },
  sceneContainerStyle: {
    marginTop: IOS ? -_.headerHeight - H_TABBAR : 0
  },
  tabBarLeft: {
    position: 'absolute',
    top: TOP_TAB_BAR + 2,
    left: 0
  }
}))
