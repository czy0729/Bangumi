/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 06:49:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List({ forwardRef }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const numColumns = $.isList ? undefined : 3

  return (
    <ListView
      key={`${$.state.layout}${numColumns}`}
      ref={forwardRef}
      keyExtractor={keyExtractor}
      style={_.mt._sm}
      contentContainerStyle={styles.contentContainerStyle}
      sections={$.sections}
      numColumns={numColumns}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
