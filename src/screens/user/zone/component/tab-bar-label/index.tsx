/*
 * @Author: czy0729
 * @Date: 2024-01-01 20:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:56:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { USER_STATS_TYPES } from '@stores/users/ds'
import { MODEL_TIMELINE_TYPE, TIMELINE_TYPE } from '@constants'
import { COLLECTION_TYPES } from '../../ds'
import { COLLECTION_PAGE, COMPONENT, STATS_PAGE, TIMELINE_PAGE } from './ds'
import { styles } from './styles'

import type { TimeLineTypeCn } from '@types'
import type { UserStatsTitle } from '@stores/users/ds'
import type { CollectionTypeTitle } from '../../ds'
import type { Ctx } from '../../types'
import type { Props } from './types'

type SelectableTabLabel = {
  label: string
  options: readonly string[]
  onSelect: (title?: string) => void
}

function TabBarLabel({ style, title, tabKey }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elText = (
    <Text style={style} type='title' size={13} lineHeight={13} noWrap>
      {title}
    </Text>
  )

  let selectableTabLabel: SelectableTabLabel | null = null
  if (tabKey === 'collection' && $.state.page === COLLECTION_PAGE) {
    selectableTabLabel = {
      label: $.collectionTypeLabel,
      options: COLLECTION_TYPES.map(item => item.title),
      onSelect: title => title && $.onSelectCollectionType(title as CollectionTypeTitle)
    }
  }

  if (tabKey === 'stats' && $.state.page === STATS_PAGE) {
    selectableTabLabel = {
      label: $.statsTypeLabel,
      options: USER_STATS_TYPES.map(item => item.title),
      onSelect: title => title && $.onSelectStatsType(title as UserStatsTitle)
    }
  }

  if (tabKey === 'timeline' && $.state.page === TIMELINE_PAGE) {
    selectableTabLabel = {
      label: MODEL_TIMELINE_TYPE.getLabel($.state.timelineType),
      options: TIMELINE_TYPE.map(item => item.label),
      onSelect: title => title && $.onSelectTimelineType(title as TimeLineTypeCn)
    }
  }

  if (selectableTabLabel) {
    return (
      <Popover
        style={_.container.block}
        data={selectableTabLabel.options}
        onSelect={selectableTabLabel.onSelect}
      >
        <Flex style={styles.popover} justify='center'>
          {elText}
          <Text size={10} lineHeight={13} type='sub' noWrap>
            {' '}
            {selectableTabLabel.label}{' '}
          </Text>
        </Flex>
      </Popover>
    )
  }

  return elText
}

export default observer(TabBarLabel)
