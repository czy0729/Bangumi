/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:55:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

export default observer(({ item, index }) => {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.state.status === '有关联系列' && item.length <= 1) return null

  const data = $.filterData(item)
  return <Item styles={memoStyles()} data={data} index={index} subjects={$.subjects(data)} />
})
