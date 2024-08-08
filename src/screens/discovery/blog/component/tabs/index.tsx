/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 05:40:34
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../../ds'
import { BlogType, Ctx } from '../../types'
import List from '../list'
import { COMPONENT } from './ds'

function Tabs(props, { $ }: Ctx) {
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={item => <List key={item.key} type={item.key as BlogType} />}
      onChange={$.onTabChange}
    />
  )
}

export default obc(Tabs, COMPONENT)
