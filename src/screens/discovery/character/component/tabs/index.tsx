/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:33:18
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  const { $ } = useStore<Ctx>()
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

export default ob(Tabs, COMPONENT)
