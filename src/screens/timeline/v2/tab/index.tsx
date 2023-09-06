/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:31:03
 */
import React from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurViewRoot, BlurViewTab, BlurViewBottomTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../ds'
import { Ctx } from '../types'
import TabBar from './tab-bar'
import TabBarLeft from './tab-bar-left'
import renderScene from './renderScene'
import { memoStyles } from './styles'

function Tab(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <BlurViewRoot>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        lazy
        lazyPreloadDistance={0}
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderBackground={<BlurViewTab length={TABS.length} />}
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <View style={styles.tabBarLeft}>
        <TabBarLeft />
      </View>
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
