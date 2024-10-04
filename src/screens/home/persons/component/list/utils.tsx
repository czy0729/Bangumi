/*
 * @Author: czy0729
 * @Date: 2024-04-18 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 12:22:10
 */
import React from 'react'
import { ItemCharacter } from '@_'
import { PersonsItem } from '@stores/mono/types'
import { IMG_INFO_ONLY } from '@constants'
import { EVENT } from './ds'

export function renderItem({ item, index }: { item: PersonsItem; index: number }) {
  return (
    <ItemCharacter
      index={index}
      event={EVENT}
      type='person'
      {...item}
      cover={item.cover || IMG_INFO_ONLY}
    />
  )
}
