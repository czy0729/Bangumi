/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:19:00
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default obc(({ item }, { $ }: Ctx) => {
  if ($.state.status === '有关联系列' && item.length <= 1) return null

  const data = $.filterData(item)
  return <Item styles={memoStyles()} data={data} subjects={$.subjects(data)} />
}, COMPONENT)
