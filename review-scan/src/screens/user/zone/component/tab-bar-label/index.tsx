/*
 * @Author: czy0729
 * @Date: 2024-01-01 20:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:18:54
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_TIMELINE_TYPE, TIMELINE_TYPE } from '@constants'
import { TextStyle } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, TIMELINE_PAGE } from './ds'
import { styles } from './styles'

function TabBarLabel({ style, title }: { style?: TextStyle; title: string }) {
  const { $ } = useStore<Ctx>()
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
}

export default ob(TabBarLabel, COMPONENT)
