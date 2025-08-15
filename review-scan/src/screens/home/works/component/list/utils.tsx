/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:40:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 15:51:33
 */
import React from 'react'
import { _ } from '@stores'
import GridItem from './grid'
import ListItem from './list'

export function renderListItem({ item, index }) {
  // {!index && <Heatmap id='作品.跳转' />}
  return <ListItem item={item} index={index} />
}

export function renderGridItem({ item, index }) {
  return <GridItem item={item} index={index} numColumns={_.portrait(3, 5)} />
}
