/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:23:47
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function LocalList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ListView
      key={$.sections.length}
      keyExtractor={keyExtractor}
      style={_.mt.sm}
      sections={$.sections}
      renderSectionHeader={renderSectionHeader}
      // @ts-expect-error
      renderItem={renderItem}
    />
  ))
}

export default LocalList
