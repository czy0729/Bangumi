/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:55:08
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(({ item, index }) => {
  const { $ } = useStore<Ctx>()
  if ($.state.status === '有关联系列' && item.length <= 1) return null

  const data = $.filterData(item)
  return <Item styles={memoStyles()} data={data} index={index} subjects={$.subjects(data)} />
}, COMPONENT)
