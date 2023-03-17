/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 01:53:14
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import List from '../list'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const STATUS_MAP = {
  wishes: 'wish',
  collections: 'collect',
  doings: 'doing',
  on_hold: 'onHold',
  dropped: 'dropped'
} as const

function Tab(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { page } = $.state
  const renderScene = SceneMap(
    Object.assign(
      {},
      ...TABS.map(item => ({
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
          routes: TABS
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
              const count = $.counts[route.key] || $.params[STATUS_MAP[route.key]]
              const { type } = $.params
              let title = route.title || ''
              if (type === '书籍') {
                title = title.replace('看', '读')
              } else if (type === '游戏') {
                title = title.replace('看', '玩')
              } else if (type === '音乐') {
                title = title.replace('看', '听')
              }

              return (
                <Flex style={_.container.block} justify='center'>
                  <Text type='title' size={13} bold={focused}>
                    {title}
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
