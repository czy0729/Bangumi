/*
 * @Author: czy0729
 * @Date: 2023-03-02 14:17:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:10:09
 */
import React from 'react'
import { ItemVoice } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

import type { MonoVoicesItem } from '@stores/subject/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ item, index }: RenderItem<MonoVoicesItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { status } = $.state

    return (
      <ItemVoice {...item} navigation={navigation} event={EVENT} index={index} collected={status} />
    )
  })
}

export default Item
