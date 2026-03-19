/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:02:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:35:47
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import Sub from '../sub'
import { styles } from './styles'

import type { Props } from './types'

function FloorSub({
  extraStyle,
  authorId,
  id,
  isExpand,
  matchLink,
  postId,
  readedTime,
  expandNums,
  sub,
  url,
  userId,
  newFloorStyle,
  event,
  onJumpTo,
  onShowFixedTextare,
  onToggleExpand
}: Props) {
  if (!sub.length) return null

  return (
    <Flex>
      <View style={styles.left} />
      <Flex.Item style={styles.sub}>
        <Flex wrap='wrap'>
          {sub
            .filter((_item, index) => (isExpand ? true : index < expandNums))
            .map(item => (
              <Sub
                key={item.id}
                extraStyle={extraStyle}
                id={item.id}
                message={item.message}
                userId={item.userId}
                userName={item.userName}
                avatar={item.avatar}
                floor={item.floor}
                erase={item.erase}
                replySub={item.replySub}
                time={item.time}
                postId={postId}
                authorId={authorId}
                uid={userId}
                url={url}
                readedTime={readedTime}
                matchLink={matchLink}
                newFloorStyle={newFloorStyle}
                event={event}
                onJumpTo={onJumpTo}
                onShowFixedTextare={onShowFixedTextare}
              />
            ))}
        </Flex>

        {sub.length > expandNums && (
          <Touchable
            onPress={() => {
              if (typeof onToggleExpand === 'function') onToggleExpand(id)
            }}
          >
            <Text
              style={styles.expand}
              type={isExpand ? 'sub' : 'main'}
              size={12}
              align='center'
              bold
            >
              {isExpand ? '收起楼层' : `展开 ${sub.length - expandNums} 条回复`}
            </Text>
          </Touchable>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default observer(FloorSub)
