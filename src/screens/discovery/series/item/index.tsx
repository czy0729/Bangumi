/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:32:15
 */
import React from 'react'
import { obc } from '@utils/decorators'
import Item from './item'
import { memoStyles } from './styles'

export default obc(({ item }, { $ }) => {
  const data = $.filterData(item)
  return <Item styles={memoStyles()} data={data} subjects={$.subjects(data)} />
})
