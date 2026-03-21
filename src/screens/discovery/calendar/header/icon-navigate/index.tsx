/*
 * @Author: czy0729
 * @Date: 2026-03-21 15:29:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:43:08
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { date, feedback, getTimestamp } from '@utils'
import { r } from '@utils/dev'
import { PREV_DAY_HOUR } from '../../ds'
import { getItemTime } from '../../utils'
import { COMPONENT, ITEM_HEIGHT, SECTION_HEIGHT } from './ds'

import type { Props } from './types'

function IconNavigate({ $, onScrollToOffset }: Props) {
  r(COMPONENT)

  const sections = $.sections
  const handleNavigate = useCallback(() => {
    if (typeof onScrollToOffset !== 'function') return

    try {
      const showPrevDay = new Date().getHours() < PREV_DAY_HOUR
      const targetSectionIndex = showPrevDay ? 1 : 0

      const current = parseInt(date('Hi', getTimestamp()))
      let totalOffset = 0
      let lineInnerOffset = -1
      for (let i = 0; i < targetSectionIndex; i += 1) {
        const itemsCount = sections[i]?.data?.[0]?.items?.length || 0
        totalOffset += itemsCount * ITEM_HEIGHT + SECTION_HEIGHT
      }

      const targetItems = sections[targetSectionIndex]?.data?.[0]?.items || []
      for (let index = 0; index < targetItems.length; index += 1) {
        const item = targetItems[index]
        const time = getItemTime(item, index, targetItems)
        if (parseInt(time) > current) {
          lineInnerOffset = index * ITEM_HEIGHT
          break
        }
      }

      if (lineInnerOffset === -1) {
        lineInnerOffset = targetItems.length * ITEM_HEIGHT
      }

      feedback(true)
      onScrollToOffset({
        animated: true,
        offset: Math.max(0, totalOffset + lineInnerOffset - ITEM_HEIGHT)
      })
    } catch {}
  }, [onScrollToOffset, sections])

  const { _loaded, layout, expand } = $.state
  if (!_loaded || layout !== 'list' || expand) return null

  return (
    <IconTouchable
      style={_.mr.xs}
      name='md-radio-button-on'
      size={16}
      color={_.colorTitle}
      onPress={handleNavigate}
    />
  )
}

export default observer(IconNavigate)
