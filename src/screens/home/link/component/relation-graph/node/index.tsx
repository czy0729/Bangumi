/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:12:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 23:50:17
 */
import React, { useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Flex, getCoverSrc, Text } from '@components'
import { collectionStore, subjectStore } from '@stores'
import { stl } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import Subject from '../subject'
import { memoStyles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

function Node({
  item,
  focusId,
  activeRelation,
  setLayout,
  setFocusId,
  setActiveRelation,
  focusRelations
}: Props) {
  const navigation = useNavigation()
  const [y, setY] = useState(0)

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { x, y, width, height } = e.nativeEvent.layout
      setLayout(Number(item.id), x, y, width, height)
      setY(y)
    },
    [item.id, setLayout]
  )

  const handleNodePress = useCallback(
    (id: number) => {
      if (focusId === id) id = 0
      setFocusId(id)
      setActiveRelation(null)
    },
    [focusId, setActiveRelation, setFocusId]
  )

  return useObserver(() => {
    const styles = memoStyles()
    const isFocus = item.id === focusId
    const isConnectedToFocus = focusRelations.some(r => r.dst === item.id) && focusId !== 0
    const isActive = activeRelation?.dst === item.id

    return (
      <View style={styles.node} onLayout={handleLayout}>
        <Flex style={styles.collect}>
          <Text overrideStyle={styles.override} size={20} lineHeight={24}>
            {collectionStore.collect(item.id, MODEL_SUBJECT_TYPE.getTitle(item.type))}
          </Text>
        </Flex>

        <Pressable
          style={({ pressed }) =>
            stl(
              styles.touchable,
              isFocus && styles.focus,
              isConnectedToFocus && !isFocus && styles.connected,
              pressed && styles.pressed,
              isActive && styles.active
            )
          }
          onPress={() => handleNodePress(Number(item.id))}
          onLongPress={() =>
            navigation.push('Subject', {
              subjectId: item.id,
              _cn: item.nameCN,
              _jp: item.name,
              _image: getCoverSrc(subjectStore.cover(item.id), 56)
            })
          }
        >
          <Subject item={item} y={y} isFocus={isFocus} isActive={isActive} />
        </Pressable>
      </View>
    )
  })
}

export default Node
