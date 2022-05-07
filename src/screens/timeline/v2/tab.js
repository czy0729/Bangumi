/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-08 03:03:33
 */
import React from 'react'
import { View } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { window } from '@styles'
import { obc } from '@utils/decorators'
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
        key={_.orientation}
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

const W_TAB_BAR_LEFT = 68 * _.ratio
const TAB_LENTH = _.device(5, 7)
const W_TAB = (window.width - W_TAB_BAR_LEFT) / TAB_LENTH
const W_INDICATOR = 16 * _.ratio
const memoStyles = _.memoStyles(() => {
  return {
    tabBar: {
      paddingLeft: W_TAB_BAR_LEFT,
      backgroundColor: _.ios('transparent', _.select('transparent', _.colorPlain)),
      borderBottomWidth: _.ios(
        0,
        _.select(_.hairlineWidth, _.deep(0, _.hairlineWidth))
      ),
      borderBottomColor: _.ios(
        'transparent',
        _.select(_.colorBorder, _.deep('transparent', 'rgba(0, 0, 0, 0.16)'))
      ),
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
      marginTop: IOS ? -_.headerHeight - H_TABBAR : 0
    },
    tabBarLeft: {
      position: 'absolute',
      zIndex: 3,
      top: _.headerHeight - _.sm + 2,
      left: 0
    },
    blurView: {
      position: 'absolute',
      zIndex: 1,
      top: -_.statusBarHeight || 0,
      right: 0,
      height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0)
    }
  }
})
