/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 21:58:06
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
      style={_.mt._sm}
      routes={tabs}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List key={item.key} type={item.key} />}
      onChange={$.onTabChange}
    />
  )
}

export default obc(Tabs)
