/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-01 01:51:44
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectType } from '@types'
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
      renderItem={item => <List key={item.key} type={item.key as SubjectType} />}
      onChange={$.onTabChange}
    />
  )
}

export default obc(Tabs)
