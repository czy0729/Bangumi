/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:07:01
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
