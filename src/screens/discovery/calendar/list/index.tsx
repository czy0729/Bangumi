/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:12:09
 */
import React from 'react'
import { ListView } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { layout } = $.state
  const numColumns = $.isList ? undefined : 3
  return (
    <ListView
      key={`${layout}${numColumns}`}
      style={_.container.plain}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      sections={$.sections}
      lazy={2}
      numColumns={numColumns}
      scrollToTop
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      scrollEventThrottle={32}
      onScroll={$.onScroll}
    />
  )
}

export default obc(List)

function renderSectionHeader({ section: { title } }) {
  return (
    <SectionHeader
      style={[
        _.container.plain,
        {
          paddingVertical: _.md,
          paddingLeft: _._wind
        }
      ]}
      size={14}
    >
      {title}
    </SectionHeader>
  )
}

function renderItem({ item, section = {} }) {
  return <Item item={item} section={section} />
}
