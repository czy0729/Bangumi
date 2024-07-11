/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 16:35:29
 */
import React from 'react'
import { TabView } from '@components'
import { BlurViewTab } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderTabBar } from './utils'
import { COMPONENT_MAIN } from './ds'

function Tab({ renderScene }, { $ }: Ctx) {
  return (
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
  )
}

export default obc(Tab, COMPONENT_MAIN)
