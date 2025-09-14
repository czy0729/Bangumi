/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:05:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-05 13:05:42
 */
import React from 'react'
import { ItemCatalog } from '@_'
import { EVENT } from './ds'

export function renderItem({ item, index }) {
  return <ItemCatalog {...item} index={index} name='优莉雅' isUser event={EVENT} />
}
