/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 21:08:12
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.page}
      data={$.characters.list}
      limit={12}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
    />
  )
}

export default ob(List, COMPONENT)
