/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 21:02:37
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewRoot, BlurViewTab, BlurViewBottomTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../ds'
import { Ctx } from '../types'
import renderScene from './renderScene'
import TabBar from './tab-bar'

function Tab(props, { $ }: Ctx) {
  const { _loaded } = $.state
  if (!_loaded) return null

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
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
