/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 06:55:18
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import TabBarLeft from './tab-bar-left'
import { renderTabBar } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elBackground = useMemo(() => <BlurViewTab length={TABS.length} />, [])

  return useObserver(() => {
    const styles = memoStyles()

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
          onIndexChange={$.onChange}
        />
        <View style={styles.tabBarLeft}>
          <TabBarLeft />
        </View>
        <BlurViewBottomTab />
      </BlurViewRoot>
    )
  })
}

export default Tab
