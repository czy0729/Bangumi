/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 10:32:28
 */
import React from 'react'
import { ListView } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function SectionList(props, { $ }: Ctx) {
  return (
    <ListView
      key={$.sections.length}
      keyExtractor={keyExtractor}
      style={_.mt.sm}
      sections={$.sections}
      scrollToTop
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  )
}

export default obc(SectionList)

function keyExtractor(item: { topicId: any }) {
  return String(item.topicId)
}

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

function renderItem({ item }) {
  return <Item {...item} />
}
