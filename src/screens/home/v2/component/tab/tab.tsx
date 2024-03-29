/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 18:44:56
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import TabBar from './tab-bar'
import { COMPONENT_MAIN } from './ds'

function Tab({ renderScene }, { $ }: Ctx) {
  return (
    <BlurViewRoot>
      <TabView
        key={_.orientation}
        style={_.mt._sm}
        lazy
        lazyPreloadDistance={1}
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

export default obc(Tab, COMPONENT_MAIN)

function renderTabBar(props) {
  return <TabBar {...props} />
}
