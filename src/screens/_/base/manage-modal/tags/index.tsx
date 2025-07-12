/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 04:40:17
 */
import React from 'react'
import { View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, ScrollView, Text, Touchable } from '@components'
import { _, subjectStore, userStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

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
}) {
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
              let name: string
              let count: number
              if (showUserTags) {
                name = item
              } else {
                name = item.name
                count = item.count
              }

              const isSelected = selected.indexOf(name) !== -1
              return (
                <Touchable style={styles.touchTag} key={name} onPress={() => onToggleTag(name)}>
                  <Flex style={stl(styles.tag, isSelected && styles.selected)}>
                    <Text
                      size={12}
                      bold
                      type={_.select('desc', isSelected ? 'main' : 'desc')}
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
}

export default ob(Tags)
