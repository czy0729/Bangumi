/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 17:11:14
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import List from '../list'
import { TABS } from '../ds'
import { Ctx } from '../types'

function Tabs(props, { $ }: Ctx) {
  const { page } = $.state
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={TABS}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List title={item.title} id={item.key} />}
      onChange={$.onTabsChange}
    />
  )
}

export default obc(Tabs)
