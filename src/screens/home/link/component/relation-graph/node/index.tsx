/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:12:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 19:44:22
 */
import React from 'react'
import { Pressable, View } from 'react-native'
import { Flex, Text } from '@components'
import { collectionStore } from '@stores'
import { stl } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import Subject from '../subject'
import { memoStyles } from './styles'

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

  return useObserver(() => {
    const styles = memoStyles()

    const isFocus = item.id === focusId
    const isConnectedToFocus = focusRelations.some(r => r.dst === item.id) && focusId !== 0
    const isActive = activeRelation?.dst === item.id

    const handleNodePress = (id: number) => {
      // const rel = focusRelations.find(r => r.dst === id)
      // if (rel) {
      //   if (activeRelation?.dst === id) {
      //     setFocusId(id)
      //     setActiveRelation(null)
      //   } else {
      //     setActiveRelation(rel)
      //   }
      //   return
      // }

      if (focusId === id) id = 0
      setFocusId(id)
      setActiveRelation(null)
    }

    return (
      <View
        style={styles.node}
        onLayout={e => {
          const { x, y, width, height } = e.nativeEvent.layout
          setLayout(Number(item.id), x, y, width, height)
        }}
      >
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
              _jp: item.name
            })
          }
        >
          <Subject item={item} isFocus={isFocus} isActive={isActive} />
        </Pressable>
      </View>
    )
  })
}

export default Node
