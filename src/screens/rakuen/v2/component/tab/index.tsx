/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:17:30
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import renderScene from './renderScene'
import TabBar from './tab-bar'
import { COMPONENT } from './ds'

function Tab(props, { $ }: Ctx) {
  if (!$.state._loaded) return null

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

export default obc(Tab, COMPONENT)

function renderTabBar(props) {
  return <TabBar {...props} />
}
