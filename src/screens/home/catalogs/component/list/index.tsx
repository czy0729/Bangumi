/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:17:41
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={[_.container.header, _.container.bottom]}
      data={$.list}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectCatalogs}
    />
  )
}

export default ob(List, COMPONENT)
