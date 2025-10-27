/*
 * @Author: czy0729
 * @Date: 2020-03-22 19:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:39:26
 */
import React, { useCallback } from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from '../list'
import { COMPONENT } from './ds'

function Tabs() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const renderItem = useCallback(item => <List key={item.key} id={item.key} />, [])

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      style={_.container.header}
      routes={TABS}
      page={$.state.page}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
