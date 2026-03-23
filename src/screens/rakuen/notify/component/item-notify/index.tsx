/*
 * @Author: czy0729
 * @Date: 2023-02-25 21:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 06:38:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemNotify as ItemNotifyComp } from '@_'
import { r } from '@utils/dev'
import { COMPONENT, EVENT } from './ds'

import type { Props } from './types'

function ItemNotify({ item, index }: Props) {
  r(COMPONENT)

  return (
    <ItemNotifyComp
      {...item}
      event={EVENT}
      index={index - (item.repeat || 0)}
      repeat={item.repeat || 0}
    />
  )
}

export default observer(ItemNotify)
