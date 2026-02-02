/*
 * @Author: czy0729
 * @Date: 2022-03-26 15:28:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 15:45:57
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Stars, Tag } from '@_'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { HEIGHT, memoStyles, WIDTH } from './styles'

import type { SubjectTypeCn } from '@types'
import type { TimelineViewItem } from '../../types'

function Item({ subject, action }: TimelineViewItem) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Flex style={styles.subjects} align='start' wrap='wrap'>
        <View style={styles.nodeDay} />

        {subject.map(i => {
          let type: SubjectTypeCn = '动画'
          if (action.includes('读')) type = '书籍'
          if (action.includes('听')) type = '音乐'
          if (action.includes('玩')) type = '游戏'

          const isAnime = type === '动画'
          const isMusic = type === '音乐'
          const isHalf = subject.length > 1

          const name = findSubjectCn(i.name, isAnime ? i.id : undefined)

          return (
            <View key={String(i.id)} style={isHalf ? styles.subjectHalf : styles.subject}>
              <Touchable
                animate
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId: i.id,
                    _cn: name,
                    _jp: i.name,
                    _image: getCoverSrc(i.cover, WIDTH),
                    _type: type
                  })

                  t('时间线.跳转', {
                    to: 'Suject',
                    subjectId: i.id
                  })
                }}
              >
                <Flex align='start'>
                  {!!i.cover && (
                    <View style={_.mr.md}>
                      <Cover
                        src={i.cover}
                        width={WIDTH * (isMusic ? 1.16 : 1)}
                        height={HEIGHT * (isMusic ? 1.16 : 1)}
                        type={type}
                        radius={_.radiusSm}
                      />
                    </View>
                  )}
                  <Flex.Item>
                    <Text style={_.mt.xs} size={isHalf ? 11 : 13} bold numberOfLines={3}>
                      {name}
                    </Text>
                    <Flex style={_.mt.sm}>
                      <Tag value={action.replace('了', '')} />
                      {!!i.star && <Stars style={_.ml.xs} value={i.star} size={10} />}
                    </Flex>
                    {!!i.comment && (
                      <Flex style={_.mt.md}>
                        <Text style={styles.comment} size={12} lineHeight={14}>
                          {i.comment}
                        </Text>
                      </Flex>
                    )}
                  </Flex.Item>
                </Flex>
              </Touchable>
            </View>
          )
        })}
      </Flex>
    )
  })
}

export default Item
