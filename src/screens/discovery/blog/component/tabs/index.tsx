/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 23:02:16
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { TABS } from '../../ds'
import List from '../list'
import { COMPONENT } from './ds'

import type { BlogType, Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List key={item.key} type={item.key as BlogType} />}
      onChange={$.onTabChange}
    />
  ))
}

export default Tabs
