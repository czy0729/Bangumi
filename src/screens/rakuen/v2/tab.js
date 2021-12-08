/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:56:58
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import { Flex, Text } from '@components'
import { BlurView } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import {
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO
} from '@constants/model'
import List from './list'
import Label from './label'
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
                style={[
                  memoStyles().blurView,
                  {
                    left: -_.window.width * routes.length
                  }
                ]}
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
      key={_.orientation}
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
          tabStyle={styles.tab}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
          pressOpacity={1}
          pressColor='transparent'
          scrollEnabled
          renderLabel={({ route, focused }) => {
            if (route.title === '小组' && routes[page].title === '小组') {
              return (
                <Label
                  focused={focused}
                  model={MODEL_RAKUEN_TYPE_GROUP}
                  label='小组'
                  value={group}
                />
              )
            }

            if (route.title === '人物' && routes[page].title === '人物') {
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

const memoStyles = _.memoStyles(() => {
  const W_TAB_BAR_LEFT = 0
  const W_TAB = _.window.width / 5
  const W_INDICATOR = 16 * _.ratio
  const TOP_TAB_BAR = _.headerHeight - _.ios(18, 24)
  return {
    tabBar: {
      paddingTop: TOP_TAB_BAR,
      paddingLeft: W_TAB_BAR_LEFT,
      backgroundColor: _.ios(
        'transparent',
        _.select('transparent', _.deep(_._colorPlain, _._colorDarkModeLevel1))
      ),
      borderBottomWidth: _.ios(0, _.select(_.hairlineWidth, 0)),
      borderBottomColor: _.colorBorder,
      elevation: 0
    },
    tab: {
      width: W_TAB,
      height: 48 * _.ratio
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
      marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
    },
    blurView: {
      position: 'absolute',
      zIndex: 1,
      top: _.device(0, -12),
      right: 0,
      height: _.headerHeight + H_TABBAR + _.device(0, 12)
    }
  }
})
