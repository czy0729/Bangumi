/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:03:25
 */
import React, { useCallback } from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import List from '../list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { ItemProps } from './types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback((item: ItemProps) => <List id={item.key} />, [])

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      routes={$.tabs}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={handleRenderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
