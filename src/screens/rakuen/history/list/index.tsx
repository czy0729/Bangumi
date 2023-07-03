/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 11:01:51
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ItemLazy from '../item-lazy'
import { Ctx } from '../types'
import { DS } from '../ds'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { type } = $.state
  return (
    <>
      <SegmentedControl
        key={type}
        style={styles.segment}
        size={11}
        values={DS}
        selectedIndex={DS.findIndex(item => item === type)}
        onValueChange={$.onChange}
      />
      <PaginationList2
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.list}
        limit={12}
        scrollToTop
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </>
  )
}

export default obc(List)

function keyExtractor(item: any) {
  return String(item)
}

function renderItem({ item }) {
  return <ItemLazy item={item} />
}
