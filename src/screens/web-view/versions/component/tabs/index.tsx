/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 15:59:11
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Web from '../web'
import { COMPONENT } from './ds'

function Tabs({ routes }, { $ }: Ctx) {
  const { page } = $.state
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={routes}
      page={page}
      backgroundColor={_.colorPlain}
      renderItem={(item, index) => {
        if (index - page) return null
        return <Web uri={item.key} />
      }}
      onChange={$.onChange}
    />
  )
}

export default obc(Tabs, COMPONENT)
