/*
 * @Author: czy0729
 * @Date: 2023-02-25 21:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 01:18:09
 */
import React from 'react'
import { ItemNotify as ItemNotifyComp } from '@_'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function ItemNotify({ item, index }: Props) {
  const navigation = useNavigation()
  return (
    <ItemNotifyComp
      {...item}
      navigation={navigation}
      event={EVENT}
      index={index - (item.repeat || 0)}
      repeat={item.repeat || 0}
    />
  )
}

export default ob(ItemNotify, COMPONENT)
