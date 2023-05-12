/*
 * @Author: czy0729
 * @Date: 2023-05-13 04:45:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-13 06:34:43
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Pagination({ pageCurrent, pageTotal }, { $ }: Ctx) {
  return (
    <ToolBar.Popover
      data={generateArray(pageTotal)}
      icon='md-notes'
      iconColor={_.colorDesc}
      text={pageCurrent}
      type='desc'
      onSelect={title => $.onPage(title)}
    />
  )
}

export default obc(Pagination)

function generateArray(num: number) {
  const arr = []
  for (let i = 1; i <= Number(num); i += 1) {
    arr.push(String(i))
  }
  return arr
}
