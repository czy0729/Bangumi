/*
 * @Author: czy0729
 * @Date: 2023-04-19 09:04:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:32:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { memoStyles } from '../styles'
import { COMPONENT } from './ds'

function Block({ path, tags }, { $, navigation }: Ctx) {
  if (!tags?.length) return null

  const styles = memoStyles()
  return (
    <>
      <Flex style={stl(styles.badge, systemStore.setting.subjectTagsExpand && styles.badgeExpand)}>
        <Text size={13} type='sub'>
          第三方标签
        </Text>
      </Flex>
      {tags.map((item: string) => (
        <Touchable
          key={item}
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
              {item}
            </Text>
          </View>
        </Touchable>
      ))}
    </>
  )
}

export default obc(Block, COMPONENT)
