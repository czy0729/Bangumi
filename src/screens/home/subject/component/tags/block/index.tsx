/*
 * @Author: czy0729
 * @Date: 2023-04-19 09:04:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:07:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Block({ path, tags }) {
  const { $, navigation } = useStore<Ctx>()
  if (!tags?.length) return null

  const styles = memoStyles()
  return (
    <>
      <Flex style={[styles.item, styles.disabled]}>
        <Text size={13} type='sub'>
          第三方标签
        </Text>
      </Flex>
      {tags.map(
        (
          item:
            | string
            | {
                pressable: boolean
                value: string
              }
        ) => {
          const tag = typeof item === 'string' ? item : item.value
          const pressable = typeof item === 'string' ? true : item.pressable
          if (pressable) {
            return (
              <Touchable
                key={tag}
                animate
                scale={0.9}
                onPress={() => {
                  navigation.push(path, {
                    _tags: [item]
                  })

                  t('条目.跳转', {
                    to: path,
                    from: '标签',
                    subjectId: $.subjectId
                  })
                }}
              >
                <View style={styles.item}>
                  <Text size={13} bold>
                    {tag}
                  </Text>
                </View>
              </Touchable>
            )
          }

          return (
            <View key={tag} style={[styles.item, styles.disabled]}>
              <Text size={13} bold>
                {tag}
              </Text>
            </View>
          )
        }
      )}
    </>
  )
}

export default ob(Block, COMPONENT)
