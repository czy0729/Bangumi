/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-25 18:50:41
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import List from '../list'
import { TABS } from '../ds'
import { Ctx, TabsKey } from '../types'

function Tabs(props, { $ }: Ctx) {
  const { page } = $.state
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={TABS}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onTabsChange}
    />
  )
}

export default obc(Tabs)

function renderItem(item) {
  return <List id={item.key as TabsKey} />
}
