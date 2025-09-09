/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 18:04:11
 */
import React, { useCallback } from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import List from '../list'
import { COMPONENT } from './ds'
import { ItemProps } from './types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback((item: ItemProps) => <List id={item.key} />, [])

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      style={_.container.header}
      routes={$.tabs}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={handleRenderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
