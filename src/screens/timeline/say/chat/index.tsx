/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-17 14:14:54
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from './item'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Chat({ forwardRef }: any, { $ }: Ctx) {
  const styles = memoStyles()
  const { list } = $.say
  return (
    <PaginationList2
      key={list.length}
      forwardRef={forwardRef}
      style={_.container.screen}
      contentContainerStyle={styles.container}
      keyExtractor={keyExtractor}
      data={list}
      inverted
      renderItem={renderItem}
      ListFooterComponent={null}
    />
  )
}

export default obc(Chat)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
