/*
 * @Author: czy0729
 * @Date: 2024-10-11 08:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:50:25
 */
import React, { useMemo } from 'react'
import { Flex, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COLLECTION_STATUS, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { ORDER_DS } from '../../ds'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { CollectionStatusCn } from '@types'
import type { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { userCollectionsTags } = $
    const { subjectType, order, tag } = $.state

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

    const memoCollectionStatus = useMemo(
      () => COLLECTION_STATUS.map(item => item.label.replace('看', action) as CollectionStatusCn),
      [action]
    )

    const memoTags = useMemo(
      () => ['全部', ...userCollectionsTags.map(item => `${item.tag} (${item.count})`)],
      [userCollectionsTags]
    )

    return (
      <>
        <Flex.Item style={styles.container}>
          <Flex justify='end'>
            <Popover style={styles.item} data={DATA} onSelect={$.selectSubjectType}>
              <Text size={12} bold noWrap>
                {MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)}
              </Text>
            </Popover>
            <Text style={styles.split} size={12} bold>
              ·
            </Text>
            <Popover style={styles.item} data={memoCollectionStatus} onSelect={$.selectType}>
              <Text size={12} bold noWrap>
                {MODEL_COLLECTION_STATUS.getLabel($.state.type).replace('看', action)}
              </Text>
            </Popover>
            <Text style={styles.split} size={12} bold>
              ·
            </Text>
            <Popover style={styles.item} data={ORDER_DS} onSelect={$.selectOrder}>
              <Text size={12} bold noWrap>
                按{orderText}
              </Text>
            </Popover>
          </Flex>
          <Flex justify='end'>
            <Popover style={styles.item} data={memoTags} onSelect={$.selectTag}>
              <Text size={12} bold noWrap>
                {tag || '标签'}
              </Text>
            </Popover>
          </Flex>
        </Flex.Item>
        <IconTouchable
          style={styles.setting}
          name='icon-setting'
          size={15}
          color={_.colorDesc}
          onPress={() => $.setOptions('show', true)}
        />
      </>
    )
  })
}

export default Filter
