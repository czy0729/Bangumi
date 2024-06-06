/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 14:49:07
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DS } from '../../ds'
import { Ctx } from '../../types'
import ItemLazy from './item'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function FavorList(props, { $ }: Ctx) {
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
        onValueChange={$.onValueChange}
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

export default obc(FavorList, COMPONENT)
