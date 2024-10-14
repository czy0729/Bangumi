/*
 * @Author: czy0729
 * @Date: 2024-10-11 08:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:48:24
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import {
  COLLECTION_STATUS,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE,
  SUBJECT_TYPE
} from '@constants'
import { ORDER_DS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Filter(_props, { $ }: Ctx) {
  const { subjectType, order } = $.state
  let action: string = '看'
  if (subjectType === 'music') action = '听'
  if (subjectType === 'book') action = '读'
  if (subjectType === 'game') action = '玩'

  let orderText: string = ORDER_DS[0]
  if (order === 'rate') {
    orderText = ORDER_DS[1]
  } else if (order === 'date') {
    orderText = ORDER_DS[2]
  }

  return (
    <Flex style={styles.filter}>
      <Popover
        style={styles.item}
        data={SUBJECT_TYPE.map(item => item.title)}
        onSelect={$.selectSubjectType}
      >
        <Text size={12} bold>
          {MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)}
        </Text>
      </Popover>
      <Text size={12} bold>
        ·
      </Text>
      <Popover
        style={styles.item}
        data={COLLECTION_STATUS.map(item => item.label.replace('看', action))}
        onSelect={$.selectType}
      >
        <Text size={12} bold>
          {MODEL_COLLECTION_STATUS.getLabel($.state.type).replace('看', action)}
        </Text>
      </Popover>
      <Text size={12} bold>
        ·
      </Text>
      <Popover style={styles.item} data={ORDER_DS} onSelect={$.selectOrder}>
        <Text size={12} bold>
          按{orderText}
        </Text>
      </Popover>
      <IconTouchable
        style={styles.setting}
        name='icon-setting'
        size={15}
        color={_.colorDesc}
        onPress={() => $.setOptions('show', true)}
      />
    </Flex>
  )
}

export default obc(Filter, COMPONENT)
