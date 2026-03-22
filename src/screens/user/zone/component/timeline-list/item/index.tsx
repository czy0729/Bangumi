/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:57:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemTimeline } from '@_'
import { useStore } from '@stores'
import { EVENT } from '../ds'
import { COMPONENT } from './ds'

import type { TimelineItem } from '@stores/timeline/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../../types'

function Item({ item, index }: RenderItem<TimelineItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <ItemTimeline
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      full
      onDelete={$.doDelete}
    />
  )
}

export default observer(Item)
