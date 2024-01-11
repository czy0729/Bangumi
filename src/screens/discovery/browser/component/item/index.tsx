/*
 * @Author: czy0729
 * @Date: 2023-03-28 13:26:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:24:30
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'

function Item({ item, index }, { $ }: Ctx) {
  return $.isList ? <ListItem item={item} index={index} /> : <GridItem item={item} index={index} />
}

export default obc(Item, COMPONENT)
