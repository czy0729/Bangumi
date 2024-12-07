/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 16:02:56
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { Flex, Heatmap, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from '../list'
import { COMPONENT, STATUS_MAP } from './ds'
import { memoStyles } from './styles'

function Tab() {
  const { $ } = useStore<Ctx>()
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
        style={_.container.header}
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
                  <Text type='title' size={13} bold={focused} noWrap>
                    {title}
                  </Text>
                  {!!count && (
                    <Text style={_.ml.xxs} type='sub' size={11} bold lineHeight={13} noWrap>
                      {count}
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

export default ob(Tab, COMPONENT)
