/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * 目录编纂者切换条
 */
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { DATA_USERS } from '../../ds'
import { COMPONENT, VALUES } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { userId } = $

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={VALUES}
      selectedIndex={DATA_USERS.findIndex(item => item.userId === userId)}
      onValueChange={value => {
        const index = VALUES.indexOf(value)
        if (index !== -1) $.onUserSelect(DATA_USERS[index].userId)
      }}
    />
  )
}

export default observer(Tab)
