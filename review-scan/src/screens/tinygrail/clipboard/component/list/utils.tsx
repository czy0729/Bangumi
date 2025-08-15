/*
 * @Author: czy0729
 * @Date: 2025-04-04 07:21:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:21:37
 */
import React from 'react'
import Item from '../../../_/item'
import { EVENT } from './ds'

export function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
