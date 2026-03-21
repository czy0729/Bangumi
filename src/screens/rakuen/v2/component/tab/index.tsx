/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 03:00:00
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import { renderTabBar } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elBackground = useMemo(() => <BlurViewTab length={TABS.length} />, [])

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
}

export default observer(Tab)
