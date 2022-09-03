/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:09:26
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
      renderItem={item => <List key={item.key} id={item.key as SubjectType} />}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs)
