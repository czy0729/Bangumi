/*
 * @Author: czy0729
 * @Date: 2022-03-26 15:28:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 16:03:13
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Cover, Stars, Tag } from '@_'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { memoStyles, WIDTH, HEIGHT } from './styles'

function Item({ subject, action }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <Flex style={styles.subjects} align='start' wrap='wrap'>
      <View style={styles.nodeDay} />
      {subject.map(i => {
        const cn = findSubjectCn(i.name)
        let type: SubjectTypeCn = '动画'
        if (action.includes('读')) type = '书籍'
        if (action.includes('听')) type = '音乐'
        if (action.includes('玩')) type = '游戏'
        return (
          <Flex
            key={String(i.id)}
            style={subject.length > 1 ? styles.subjectHalf : styles.subject}
            align='start'
          >
            <View style={styles.cover}>
              <Cover
                src={i.cover}
                width={WIDTH}
                height={HEIGHT}
                type={type}
                radius
                onPress={() => {
                  t('时间线.跳转', {
                    to: 'Suject',
                    subjectId: i.id
                  })

                  navigation.push('Subject', {
                    subjectId: i.id,
                    _cn: cn,
                    _jp: i.name,
                    _image: i.cover,
                    _type: type
                  })
                }}
              />
            </View>
            <Flex.Item style={_.ml.md}>
              <Flex>
                <Tag value={action.replace('了', '')} />
                {!!i.star && <Stars style={_.ml.xs} value={i.star} size={10} />}
              </Flex>
              <Text style={_.mt.sm} size={12} bold numberOfLines={3}>
                {cn}
              </Text>
              {!!i.comment && (
                <Flex style={_.mt.sm}>
                  <Text style={styles.comment} size={12}>
                    {i.comment}
                  </Text>
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default obc(Item)
