/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-09 22:19:23
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import ListItem from './list-item'
import { memoStyles } from './styles'

const LIST_CACHE = {}

export default obc(({ style, index, type = 'anime' }, { $ }: Ctx) => {
  // global.rerender('Discovery.ListItem')

  const { dragging } = $.state
  if (dragging) return null

  const list = LIST_CACHE[type] || $.ramdonHome[type]
  if (!list?.length) return null
  if (list?.length && !LIST_CACHE[type]) LIST_CACHE[type] = list

  return (
    <ListItem
      styles={memoStyles()}
      style={style}
      index={index}
      type={type}
      list={LIST_CACHE[type]}
      friendsChannel={$.friendsChannel(type)}
      friendsMap={$.friendsMap}
    />
  )
})
