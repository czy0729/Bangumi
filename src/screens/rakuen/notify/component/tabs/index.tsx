/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:56:02
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

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

export default obc(Tabs, COMPONENT)
