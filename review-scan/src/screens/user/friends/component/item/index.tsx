/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:43:14
 */
import React from 'react'
import { ItemFriends } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function Item({ item }: Props) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <ItemFriends
      navigation={navigation}
      event={EVENT}
      {...item}
      {...$.users(item.userId)}
      filter={$.state.filter}
    />
  )
}

export default ob(Item, COMPONENT)
