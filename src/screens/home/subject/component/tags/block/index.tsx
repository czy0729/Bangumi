/*
 * @Author: czy0729
 * @Date: 2023-04-19 09:04:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 17:01:17
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Block({ path, tags }, { $, navigation }: Ctx) {
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
                  t('条目.跳转', {
                    to: path,
                    from: '标签',
                    subjectId: $.subjectId
                  })

                  navigation.push(path, {
                    _tags: [item]
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

export default obc(Block, COMPONENT)
