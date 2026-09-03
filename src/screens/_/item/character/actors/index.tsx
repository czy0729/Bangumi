/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 03:45:00
 *
 * 角色/声优条目内的声优列表, 每个声优一个 Popover 菜单
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _ } from '@stores'
import { EVENT } from '@constants'
import ActorItem from './item'

import type { Props } from './types'

function Actors({ actors = [], y, event = EVENT }: Props) {
  return (
    <Flex style={_.mt.sm} wrap='wrap'>
      {actors.map(item => (
        <ActorItem key={item.id} item={item} y={y} event={event} single={actors.length <= 1} />
      ))}
    </Flex>
  )
}

export default observer(Actors)
