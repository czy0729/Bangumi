/*
 * @Author: czy0729
 * @Date: 2020-09-21 17:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { observer } from 'mobx-react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tabs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerStyle } = useInsets()

  return (
    <TabsV2
      key={_.orientation}
      style={headerStyle}
      routes={TABS}
      page={$.state.page}
      backgroundColor={_.colorPlain}
      renderItem={renderItem}
      onChange={$.onTabsChange}
    />
  )
}

export default observer(Tabs)
