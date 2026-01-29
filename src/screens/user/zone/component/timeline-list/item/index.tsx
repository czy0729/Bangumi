/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 12:33:53
 */
import React from 'react'
import { ItemTimeline } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { EVENT } from '../ds'
import { COMPONENT } from './ds'

import type { TimelineItem } from '@stores/timeline/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../../types'

function Item({ item, index }: RenderItem<TimelineItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ItemTimeline
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      full
      onDelete={$.doDelete}
    />
  ))
}

export default Item
