/*
 * @Author: czy0729
 * @Date: 2023-04-19 09:04:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-26 19:47:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { Ctx, TagsItem } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Block({ path, tags }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!tags?.length) return null

    const styles = memoStyles()

    const handlePress = (item: TagsItem) => {
      // @ts-expect-error
      navigation.push(path, {
        _tags: [item]
      })

      t('条目.跳转', {
        to: path,
        from: '标签',
        subjectId: $.subjectId
      })
    }

    return (
      <>
        <Flex style={[styles.item, styles.disabled]}>
          <Text size={13} type='sub'>
            第三方标签
          </Text>
        </Flex>

        {tags.map(item => {
          const { tag, pressable } =
            typeof item === 'string'
              ? { tag: item, pressable: true }
              : { tag: item.value, pressable: item.pressable }

          const content = (
            <View style={stl(styles.item, !pressable && styles.disabled)}>
              <Text size={13} bold>
                {tag}
              </Text>
            </View>
          )

          return pressable ? (
            <Touchable key={tag} animate scale={0.9} onPress={() => handlePress(item)}>
              {content}
            </Touchable>
          ) : (
            <View key={tag}>{content}</View>
          )
        })}
      </>
    )
  })
}

export default Block
