/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:47:56
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { AnyObject, SubjectType } from '@types'
import { Ctx } from '../../types'
import ListItem from './list-item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const LIST_CACHE = {}

function ListItemWrap({
  style,
  index,
  type = 'anime'
}: AnyObject<{
  type: SubjectType
}>) {
  const { $ } = useStore<Ctx>()
  if ($.state.dragging) return null

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
    />
  )
}

export default ob(ListItemWrap, COMPONENT)
