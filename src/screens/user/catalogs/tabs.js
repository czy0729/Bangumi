/*
 * @Author: czy0729
 * @Date: 2020-03-22 19:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-06 08:09:09
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import List from './list'
import { tabs } from './store'

function Tabs(props, { $ }) {
  const { page } = $.state
  return (
    <TabsV2
      key={_.orientation}
      routes={tabs}
      page={page}
      renderItem={item => <List key={item.key} id={item.key} />}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs)
