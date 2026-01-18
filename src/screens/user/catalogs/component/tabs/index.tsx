/*
 * @Author: czy0729
 * @Date: 2020-03-22 19:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 09:13:23
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
      renderItem={renderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
