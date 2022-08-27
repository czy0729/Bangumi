/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:47:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:39:37
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_SORT } from '../ds'

function Sort(props, { $ }) {
  const { sort } = $.state
  return (
    <ToolBar.Popover
      data={DATA_SORT}
      icon='md-sort'
      iconColor={sort ? _.colorDesc : _.colorSub}
      text={sort || '排序'}
      type={sort ? 'desc' : undefined}
      onSelect={$.onSortSelect}
    />
  )
}

export default obc(Sort)
