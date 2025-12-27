/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:59:14
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Web from '../web'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs({ routes }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Tabs
