/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 22:52:52
 */
import React, { useMemo } from 'react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import { renderTabBar } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elBackground = useMemo(() => <BlurViewTab length={TABS.length} />, [])

  return useObserver(() => {
    if (!$.state._loaded) return null

    return (
      <BlurViewRoot>
        <TabView
          key={_.orientation}
          lazy
          lazyPreloadDistance={0}
          navigationState={$.navigationState}
          renderTabBar={renderTabBar}
          renderBackground={elBackground}
          renderScene={renderScene}
          onSwipeStart={$.onSwipeStart}
          onSwipeEnd={$.onSwipeEnd}
          onIndexChange={$.onChange}
        />
        <BlurViewBottomTab />
      </BlurViewRoot>
    )
  })
}

export default Tab
