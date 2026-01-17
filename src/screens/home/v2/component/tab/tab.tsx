/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:56:50
 */
import React, { useMemo } from 'react'
import { TabView } from '@components'
import { BlurViewTab } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { renderTabBar } from './utils'
import { COMPONENT_MAIN } from './ds'

import type { Ctx } from '../../types'

function Tab({ renderScene }) {
  const { $ } = useStore<Ctx>(COMPONENT_MAIN)

  return useObserver(() => {
    const { length } = $.tabs

    const elBackground = useMemo(() => <BlurViewTab length={length} />, [length])

    return (
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={1}
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderBackground={elBackground}
        renderScene={renderScene}
        onSwipeStart={$.onSwipeStart}
        onSwipeEnd={$.onSwipeEnd}
        onIndexChange={$.onChange}
      />
    )
  })
}

export default Tab
