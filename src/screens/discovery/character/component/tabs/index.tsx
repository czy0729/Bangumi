/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:56:07
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { headerStyle } = useInsets()

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      style={headerStyle}
      routes={$.tabs}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  ))
}

export default Tabs
