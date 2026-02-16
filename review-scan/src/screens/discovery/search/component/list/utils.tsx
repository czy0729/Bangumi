/*
 * @Author: czy0729
 * @Date: 2024-01-09 13:26:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-09 13:26:07
 */
import React from 'react'
import { Heatmap } from '@components'
import Item from './item'

export function renderItem({ item, index }) {
  return (
    <>
      <Item item={item} index={index} />
      {!index && <Heatmap id='搜索.跳转' />}
    </>
  )
}
