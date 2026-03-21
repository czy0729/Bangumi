/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:20:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import ListItem from './list-item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props, MainProps } from './types'

const MEMO_LIST = new Map<Props['type'], MainProps['list']>()

function ListItemWrap({ style, index, type = 'anime' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.state.dragging) return null

  const list = MEMO_LIST.get(type) || $.ramdonHome[type]
  if (!list?.length) return null

  if (list?.length && !MEMO_LIST.has(type)) MEMO_LIST.set(type, list)

  return (
    <ListItem
      styles={memoStyles()}
      style={style}
      index={index}
      type={type}
      list={MEMO_LIST.get(type)}
      friendsChannel={$.friendsChannel(type)}
    />
  )
}

export default observer(ListItemWrap)
