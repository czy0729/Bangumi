/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:10:45
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { layout } = $.state
  const numColumns = $.isList ? undefined : 3
  return (
    <ListView
      key={`${layout}${numColumns}`}
      style={_.mt._sm}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      sections={$.sections}
      lazy={2}
      numColumns={numColumns}
      scrollToTop
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
    />
  )
}

export default obc(List, COMPONENT)
