/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 10:15:07
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectCatalogs}
    />
  )
}

export default obc(List, COMPONENT)
