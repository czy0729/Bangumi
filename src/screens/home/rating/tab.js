/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-08 03:03:26
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import List from './list'
import { routes } from './store'

const statusMap = {
  wishes: 'wish',
  collections: 'collect',
  doings: 'doing',
  on_hold: 'onHold',
  dropped: 'dropped'
}

function Tab(props, { $ }) {
  const styles = memoStyles()
  const { page } = $.state
  const renderScene = SceneMap(
    Object.assign(
      {},
      ...routes.map(item => ({
        [item.key]: () => <List title={item.title} />
      }))
    )
  )
  return (
    <>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        lazyPreloadDistance={0}
        navigationState={{
          index: page,
          routes
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            key={Object.keys($.counts) ? '1' : '0'}
            style={styles.tabBar}
            tabStyle={styles.tab}
            labelStyle={styles.label}
            indicatorStyle={styles.indicator}
            pressOpacity={1}
            pressColor='transparent'
            renderLabel={({ route, focused }) => {
              const count = $.counts[route.key] || $.params[statusMap[route.key]]
              return (
                <Flex style={_.container.block} justify='center'>
                  <Text type='title' size={13} bold={focused}>
                    {route.title}
                  </Text>
                  {!!count && (
                    <Text type='sub' size={11} bold lineHeight={13}>
                      {' '}
                      {count}{' '}
                    </Text>
                  )}
                </Flex>
              )
            }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='用户评分.标签页切换'
        transparent
      />
    </>
  )
}

export default obc(Tab)

const memoStyles = _.memoStyles(() => {
  const W_TAB = _.window.width / routes.length
  const W_INDICATOR = 16
  return {
    tabBar: {
      backgroundColor: IOS
        ? 'transparent'
        : _.select('transparent', _.deepDark ? _._colorPlain : _._colorDarkModeLevel1),
      borderBottomWidth: _.select(
        IOS ? 0 : _.hairlineWidth,
        _.deepDark ? 0 : _.hairlineWidth
      ),
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
    }
  }
})
