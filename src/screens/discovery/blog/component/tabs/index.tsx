/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:51:07
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { headerStyle } = useInsets()

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      style={headerStyle}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onTabChange}
    />
  ))
}

export default Tabs
