/*
 * @Author: czy0729
 * @Date: 2023-03-02 14:17:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 22:26:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemVoice } from '@_'
import { useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { MonoVoicesItem } from '@stores/subject/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ item, index }: RenderItem<MonoVoicesItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { status, outerOrder, innerOrder } = $.state

  return (
    <ItemVoice
      {...item}
      navigation={navigation}
      event={EVENT}
      index={index}
      showMonoId={outerOrder === 'id_asc' || outerOrder === 'id_desc'}
      showSubjectId={
        outerOrder === 'subject_max_desc' ||
        outerOrder === 'subject_min_asc' ||
        innerOrder === 'id_asc' ||
        innerOrder === 'id_desc'
      }
      collected={status}
    />
  )
}

export default observer(Item)
