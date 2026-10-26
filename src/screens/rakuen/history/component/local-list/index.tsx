/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 */
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function LocalList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ListView
      keyExtractor={keyExtractor}
      style={_.mt.sm}
      sections={$.sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  )
}

export default observer(LocalList)
