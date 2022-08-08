/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 09:00:33
 */
import React from 'react'
import { Heatmap } from '@components'
import { asc, desc, getTimestamp, getRecentTimestamp } from '@utils'
import Item from './item'

export function renderItem({ item, index }) {
  return (
    <>
      <Item item={item} />
      {!index && <Heatmap id='好友.跳转' />}
    </>
  )
}

export function keyExtractor(item: { userId: any }) {
  return String(item.userId)
}

export function sortByRecent(a: string, b: string) {
  if (a.includes('-') && !b.includes('-')) return 1
  if (!a.includes('-') && b.includes('-')) return -1
  if (a.includes('-') && b.includes('-'))
    return desc(getTimestamp(a) || 0, getTimestamp(b) || 0)
  return asc(getRecentTimestamp(a) || 0, getRecentTimestamp(b) || 0)
}
