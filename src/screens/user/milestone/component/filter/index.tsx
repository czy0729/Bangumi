/*
 * @Author: czy0729
 * @Date: 2024-10-11 08:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 06:25:58
 *
 * 照片墙筛选行
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { COLLECTION_STATUS, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { ORDER_DS } from '../../ds'
import { COMPONENT, DATA, DATA_SCORE } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatusCn } from '@types'
import type { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const {
    selectSubjectType,
    selectType,
    selectOrder,
    userCollectionsTags,
    selectTag,
    selectScore
  } = $
  const { userInfo, subjectType, order, tag, type, score } = $.state

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

  const collectionStatus = COLLECTION_STATUS.map(
    item => item.label.replace('看', action) as CollectionStatusCn
  )
  const tags = ['全部', ...userCollectionsTags.map(item => `${item.tag} (${item.count})`)]

  const elSplit = (
    <Text
      style={stl(
        styles.split,
        !userInfo && {
          marginHorizontal: 1
        }
      )}
      size={12}
      bold
    >
      ·
    </Text>
  )
  const elSubjectType = (
    <Popover
      style={stl(styles.item, !userInfo && styles.itemLg)}
      data={DATA}
      onSelect={selectSubjectType}
    >
      <Text size={12} bold noWrap>
        {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
      </Text>
    </Popover>
  )
  const elCollectionStatus = (
    <Popover
      style={stl(styles.item, !userInfo && styles.itemLg)}
      data={collectionStatus}
      onSelect={selectType}
    >
      <Text size={12} bold noWrap>
        {MODEL_COLLECTION_STATUS.getLabel(type).replace('看', action)}
      </Text>
    </Popover>
  )
  const elOrder = (
    <Popover
      style={stl(styles.item, !userInfo && styles.itemLg)}
      data={ORDER_DS}
      onSelect={selectOrder}
    >
      <Text size={12} bold noWrap>
        按{orderText}
      </Text>
    </Popover>
  )
  const elTag = (
    <Popover
      style={stl(styles.item, !userInfo && styles.itemLg)}
      data={tags}
      onSelect={selectTag}
    >
      <Text size={12} bold noWrap>
        {tag || '标签'}
      </Text>
    </Popover>
  )
  const elScore = (
    <Popover
      style={stl(styles.item, !userInfo && styles.itemLg)}
      data={DATA_SCORE}
      onSelect={selectScore}
    >
      <Text size={12} bold noWrap>
        {!score || score === '全部' ? '评分' : `★ ${score}`}
      </Text>
    </Popover>
  )

  return (
    <>
      <Flex.Item style={styles.container}>
        <Flex justify={userInfo ? 'end' : 'start'}>
          {elSubjectType}
          {elSplit}
          {elCollectionStatus}
          {elSplit}
          {elOrder}
          {!userInfo && (
            <>
              {elSplit}
              {elTag}
              {elSplit}
              {elScore}
            </>
          )}
        </Flex>
        {userInfo && (
          <Flex justify='end'>
            {elTag}
            {elSplit}
            {elScore}
          </Flex>
        )}
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
}

export default observer(Filter)
