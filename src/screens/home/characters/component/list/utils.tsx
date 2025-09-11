/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:52:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-18 14:52:16
 */
import React from 'react'
import { ItemCharacter } from '@_'
import { CharactersItem } from '@stores/mono/types'
import { RenderItem } from '@types'
import { EVENT } from './ds'

export function renderItem({ item, index }: RenderItem<CharactersItem>) {
  return <ItemCharacter {...item} index={index} event={EVENT} />
}
