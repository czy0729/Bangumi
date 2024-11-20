/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:45:35
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Web from '../web'
import { COMPONENT } from './ds'

function Tabs({ routes }) {
  const { $ } = useStore<Ctx>()
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

export default ob(Tabs, COMPONENT)
