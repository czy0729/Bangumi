/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 16:01:08
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs(props, { $ }: Ctx) {
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={$.tabs}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs, COMPONENT)
