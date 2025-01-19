/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:53:35
 */
import React from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import renderScene from './renderScene'
import TabBar from './tab-bar'
import TabBarLeft from './tab-bar-left'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Tab() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <BlurViewRoot>
      <TabView
        key={_.orientation}
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

export default ob(Tab, COMPONENT)

function renderTabBar(props) {
  return <TabBar {...props} />
}
