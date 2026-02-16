/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 21:16:52
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import renderScene from './renderScene'
import { renderTabBar } from './utils'
import { COMPONENT } from './ds'

function Tab() {
  const { $ } = useStore<Ctx>()
  if (!$.state._loaded) return null

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
        onSwipeStart={$.onSwipeStart}
        onSwipeEnd={$.onSwipeEnd}
        onIndexChange={$.onChange}
      />
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default ob(Tab, COMPONENT)
