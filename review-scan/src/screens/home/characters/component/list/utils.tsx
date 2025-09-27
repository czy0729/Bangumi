/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:52:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-18 14:52:16
 */
import React from 'react'
import { ItemCharacter } from '@_'
import { CharactersItem } from '@stores/mono/types'
import { EVENT } from './ds'

export function renderItem({ item, index }: { item: CharactersItem; index: number }) {
  return <ItemCharacter index={index} event={EVENT} {...item} />
}
