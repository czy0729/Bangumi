/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 05:23:20
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewRoot, BlurViewTab, BlurViewBottomTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import TabBar from './tab-bar'

function Tab({ renderScene }, { $ }: Ctx) {
  rerender('Home.Tab.Main')

  return (
    <BlurViewRoot>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        lazy
        lazyPreloadDistance={0}
        // @ts-expect-error
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderBackground={<BlurViewTab length={$.tabs.length} />}
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
