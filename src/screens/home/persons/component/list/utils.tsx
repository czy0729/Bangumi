/*
 * @Author: czy0729
 * @Date: 2024-04-18 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 12:22:10
 */
import React from 'react'
import { ItemCharacter } from '@_'
import { _ } from '@stores'

import { EVENT } from './ds'

export function renderItem({ item, index }) {
  return (
    <ItemCharacter style={_.container.item} index={index} event={EVENT} type='person' {...item} />
  )
}
