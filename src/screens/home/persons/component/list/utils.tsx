/*
 * @Author: czy0729
 * @Date: 2024-04-18 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 23:45:12
 */
import { ItemCharacter } from '@_'
import { IMG_INFO_ONLY } from '@constants'
import { EVENT } from './ds'

import type { PersonsItem } from '@stores/mono/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<PersonsItem>) {
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
