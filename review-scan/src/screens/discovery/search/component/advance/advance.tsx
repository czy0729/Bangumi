/*
 * @Author: czy0729
 * @Date: 2024-01-09 10:55:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:08:22
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Iconfont, Text, Touchable } from '@components'
import { desc } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { useResult } from './hooks'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Advance = memo(
  ({ navigation, styles, cat = 'subject_2', value = '', onSubmit = FROZEN_FN }) => {
    const { result, substrings } = useResult(cat, value)
    const isSubjectId = /\d+/.test(value)
    return (
      <View>
        {isSubjectId && (
          <Flex style={styles.itemId}>
            <Touchable
              style={styles.item}
              onPress={() => {
                navigation.push('Subject', {
                  subjectId: value
                })

                t('搜索.条目直达', {
                  subjectId: value
                })
              }}
            >
              <Text size={12} bold>
                #{value}
              </Text>
            </Touchable>
          </Flex>
        )}
        {!!value &&
          result
            .sort((a, b) => desc(substrings.current[a], substrings.current[b]))
            .map(item => (
              <Flex key={item} style={styles.item}>
                <Flex.Item>
                  <Touchable
                    onPress={() => {
                      const subjectId = substrings.current[item]
                      navigation.push('Subject', {
                        subjectId
                      })

                      t('搜索.模糊查询跳转', {
                        subjectId
                      })
                    }}
                  >
                    <Highlight bold value={value} numberOfLines={2}>
                      {item}
                    </Highlight>
                  </Touchable>
                </Flex.Item>
                <Touchable
                  style={styles.open}
                  onPress={() => {
                    onSubmit(item)

                    t('搜索.模糊查询点击', {
                      text: item
                    })
                  }}
                >
                  <Iconfont name='md-search' size={20} />
                </Touchable>
              </Flex>
            ))}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Advance
