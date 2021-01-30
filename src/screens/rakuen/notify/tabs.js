/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 04:05:43
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
      routes={tabs}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List title={item.title} id={item.key} />}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs)
