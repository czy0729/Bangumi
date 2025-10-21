/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:25:53
 */
import React from 'react'
import { View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, ScrollView, Text, Touchable } from '@components'
import { _, subjectStore, userStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props } from './types'

function Tags({
  subjectId,
  tags,
  type,
  fetching,
  showTags,
  showUserTags,
  onFetchTags,
  onToggleTag,
  onToggleTagsRecent,
  onToggleTagsUser
}: Props) {
  return useObserver(() => {
    if (fetching) {
      return (
        <View style={_.ml.xs}>
          <ActivityIndicator />
        </View>
      )
    }

    const styles = memoStyles()
    const subject = subjectStore.subjectFormHTML(subjectId)
    if (!subject._loaded || !showTags) {
      return (
        <Touchable style={styles.touch} onPress={onFetchTags}>
          <Text size={13} underline>
            获取标注
          </Text>
        </Touchable>
      )
    }

    const selected = tags.split(' ')
    return (
      <View>
        <Flex style={styles.title}>
          <Touchable onPress={onToggleTagsRecent}>
            <Text style={showUserTags && styles.opacity} type='sub' size={12} bold>
              常用
            </Text>
          </Touchable>
          <View style={styles.split} />
          <Touchable onPress={onToggleTagsUser}>
            <Text style={!showUserTags && styles.opacity} type='sub' size={12} bold>
              我的
            </Text>
          </Touchable>
        </Flex>

        <ScrollView style={styles.wrap}>
          <Flex wrap='wrap'>
            {(showUserTags ? userStore.tags(type).list : subject.tags)
              .filter(item => !String(item.count).includes('更多'))
              .map(item => {
                const name = showUserTags ? item : item.name
                const count = showUserTags ? undefined : item.count
                const isSelected = selected.includes(name)

                return (
                  <Touchable style={styles.touchTag} key={name} onPress={() => onToggleTag(name)}>
                    <Flex style={stl(styles.tag, isSelected && styles.selected)}>
                      <Text
                        type={_.select('desc', isSelected ? 'main' : 'desc')}
                        size={12}
                        bold
                        s2t={false}
                      >
                        {name}
                      </Text>
                      {!!count && (
                        <Text
                          style={_.ml.xs}
                          type={_.select('sub', isSelected ? 'main' : 'sub')}
                          size={11}
                        >
                          {count}
                        </Text>
                      )}
                    </Flex>
                  </Touchable>
                )
              })}
          </Flex>
        </ScrollView>
      </View>
    )
  })
}

export default Tags
