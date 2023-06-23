/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-23 14:25:06
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Web from '../web'
import { Ctx } from '../types'

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

export default obc(Tabs)
