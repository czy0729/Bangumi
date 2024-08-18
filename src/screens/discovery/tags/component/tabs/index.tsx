/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:07:12
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs(_props, { $ }: Ctx) {
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs, COMPONENT)
