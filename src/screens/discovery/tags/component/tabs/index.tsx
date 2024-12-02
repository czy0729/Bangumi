/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 17:50:12
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  const { $ } = useStore<Ctx>()
  return (
    <TabsV2
      key={_.orientation}
      style={_.container.header}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  )
}

export default ob(Tabs, COMPONENT)
