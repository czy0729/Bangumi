/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:36:50
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { BlogType, Ctx } from '../../types'
import List from '../list'
import { COMPONENT } from './ds'

function Tabs() {
  const { $ } = useStore<Ctx>()
  return (
    <TabsV2
      key={_.orientation}
      style={_.container.header}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List key={item.key} type={item.key as BlogType} />}
      onChange={$.onTabChange}
    />
  )
}

export default ob(Tabs, COMPONENT)
