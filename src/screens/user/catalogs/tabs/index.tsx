/*
 * @Author: czy0729
 * @Date: 2020-03-22 19:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 05:12:45
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
      routes={TABS}
      page={page}
      renderItem={item => <List key={item.key} id={item.key} />}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs)
