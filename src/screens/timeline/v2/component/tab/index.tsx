/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-07 20:13:15
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { TabView } from '@components'
import { BlurViewBottomTab, BlurViewRoot, BlurViewTab } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import TabBarLeft from './tab-bar-left'
import { renderTabBar } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()

  const elBackground = useMemo(() => <BlurViewTab length={TABS.length} />, [])

  return (
    <BlurViewRoot>
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={0}
        keepDistance={systemStore.keepDistance}
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderBackground={elBackground}
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <View
        style={[
          styles.tabBarLeft,
          {
            top: headerHeight - _.sm
          }
        ]}
      >
        <TabBarLeft />
      </View>
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default observer(Tab)
