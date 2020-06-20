/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-17 10:00:56
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { TabBar, SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Text } from '@components'
import { BlurView } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_TIMELINE_TYPE } from '@constants/model'
import TabBarLeft from './tab-bar-left'
import List from './list'
import { H_TABBAR } from './store'

const routes = MODEL_TIMELINE_TYPE.data
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
            <List title={`${item.title}`} />
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
          <List title={`${item.title}`} />
        )
    }))
  )
)

function Tab(props, { $ }) {
  const styles = memoStyles()
  const { page } = $.state
  return (
    <>
      <TabView
        sceneContainerStyle={styles.sceneContainerStyle}
        // lazy={!IOS}
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
            renderLabel={({ route, focused }) => (
              <Text type='title' bold={focused}>
                {route.title}
              </Text>
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

Tab.contextTypes = {
  $: PropTypes.object
}

export default observer(Tab)

const W_TAB_BAR_LEFT = 68
const W_TAB = (_.window.width - W_TAB_BAR_LEFT) / 5
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
    zIndex: 3,
    top: TOP_TAB_BAR + 2,
    left: 0
  }
}))
