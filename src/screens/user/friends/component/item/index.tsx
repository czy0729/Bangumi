/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:54:57
 */
import React from 'react'
import { ItemFriends } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

import type { Friend } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ item }: RenderItem<Friend>) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ItemFriends event={EVENT} {...item} {...$.users(item.userId)} filter={$.state.filter} />
  ))
}

export default Item
