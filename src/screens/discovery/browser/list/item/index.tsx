/*
 * @Author: czy0729
 * @Date: 2023-03-28 13:26:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 13:30:32
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ListItem from '../list'
import GridItem from '../grid'

function Item({ item, index }, { $ }: Ctx) {
  if ($.isList) return <ListItem item={item} />
  return <GridItem item={item} index={index} />
}

export default obc(Item)
