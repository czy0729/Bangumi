/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 12:07:34
 */
import React from 'react'
import PropTypes from 'prop-types'
import { TabBar, SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Text } from '@components'
import { BlurView } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import List from './list'
import { H_TABBAR } from './store'

const routes = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'anime',
    title: '动画'
  },
  {
    key: 'book',
    title: '书籍'
  },
  {
    key: 'real',
    title: '三次元'
  }
]
const renderScene = SceneMap({
  all: () => <List title='全部' />,
  anime: () => <List title='动画' />,
  book: () => <List title='书籍' />,
  real: () => (
    <>
      <List title='三次元' />
      {IOS && (
        <BlurView
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: -_.window.width * 3,
            right: 0,
            height: _.headerHeight + H_TABBAR
          }}
        />
      )}
    </>
  )
})

function Tab(props, { $ }) {
  const styles = memoStyles()
  const { page } = $.state
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
  )
}

Tab.contextTypes = {
  $: PropTypes.object
}

export default observer(Tab)

const W_TAB = _.window.width / 4
const W_INDICATOR = 16
const memoStyles = _.memoStyles(_ => ({
  tabBar: {
    paddingTop: _.headerHeight - (IOS ? 18 : 24),
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
    marginLeft: (W_TAB - W_INDICATOR) / 2,
    backgroundColor: _.colorMain,
    borderRadius: 4
  },
  sceneContainerStyle: {
    marginTop: IOS ? -_.headerHeight - H_TABBAR : 0
  }
}))
