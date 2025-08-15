/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:42:21
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderTabBar } from './utils'
import { COMPONENT_MAIN } from './ds'

function Tab({ renderScene }) {
  const { $ } = useStore<Ctx>()
  return (
    <TabView
      key={_.orientation}
      lazy
      lazyPreloadDistance={1}
      navigationState={$.navigationState}
      renderTabBar={renderTabBar}
      renderBackground={<BlurViewTab length={$.tabs.length} />}
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default ob(Tab, COMPONENT_MAIN)
