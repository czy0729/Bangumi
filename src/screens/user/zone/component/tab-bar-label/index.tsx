/*
 * @Author: czy0729
 * @Date: 2024-01-01 20:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 12:31:55
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_TIMELINE_TYPE, TIMELINE_TYPE } from '@constants'
import { COMPONENT, TIMELINE_PAGE } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function TabBarLabel({ style, title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const elText = (
      <Text style={style} type='title' size={13} lineHeight={13} noWrap>
        {title}
      </Text>
    )

    if (title === '时间线' && $.state.page === TIMELINE_PAGE) {
      return (
        <Popover
          style={_.container.block}
          data={TIMELINE_TYPE.map(item => item.label)}
          onSelect={$.onSelectTimelineType}
        >
          <Flex style={styles.popover} justify='center'>
            {elText}
            <Text size={10} lineHeight={13} type='sub' noWrap>
              {' '}
              {MODEL_TIMELINE_TYPE.getLabel($.state.timelineType)}{' '}
            </Text>
          </Flex>
        </Popover>
      )
    }

    return elText
  })
}

export default TabBarLabel
