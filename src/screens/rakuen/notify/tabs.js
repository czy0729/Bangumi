/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 22:07:37
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import List from './list'

export const tabs = [
  {
    key: 'notify',
    title: '提醒'
  },
  {
    key: 'pmIn',
    title: '收件箱'
  },
  {
    key: 'pmOut',
    title: '已发送'
  }
]

function Tabs(props, { $ }) {
  const { page } = $.state
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={tabs}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List title={item.title} id={item.key} />}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs)
