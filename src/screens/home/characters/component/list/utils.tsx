/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:52:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 05:28:52
 */
import React from 'react'
import { ItemCharacter } from '@_'
import { IMG_INFO_ONLY } from '@constants'
import { EVENT } from './ds'

import type { CharactersItem } from '@stores/mono/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<CharactersItem>) {
  return <ItemCharacter {...item} index={index} event={EVENT} cover={item.cover || IMG_INFO_ONLY} />
}
