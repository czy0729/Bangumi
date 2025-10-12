/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 05:02:20
 */
import React from 'react'
import { ItemFriends } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function Item({ item }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ItemFriends event={EVENT} {...item} {...$.users(item.userId)} filter={$.state.filter} />
  ))
}

export default Item
