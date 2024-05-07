/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:25:23
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DS } from '../../ds'
import { Ctx } from '../../types'
import ItemLazy from '../item-lazy'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
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

export default obc(List, COMPONENT)
