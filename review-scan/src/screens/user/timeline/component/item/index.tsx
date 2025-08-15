/*
 * @Author: czy0729
 * @Date: 2022-03-26 15:28:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:43:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Stars, Tag } from '@_'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { SubjectTypeCn } from '@types'
import { COMPONENT } from './ds'
import { HEIGHT, memoStyles, WIDTH } from './styles'

function Item({ subject, action }) {
  const navigation = useNavigation()
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
          <View key={String(i.id)} style={subject.length > 1 ? styles.subjectHalf : styles.subject}>
            <Touchable
              animate
              onPress={() => {
                navigation.push('Subject', {
                  subjectId: i.id,
                  _cn: cn,
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
                <Cover src={i.cover} width={WIDTH} height={HEIGHT} type={type} radius />
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.mt.xs}>
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
            </Touchable>
          </View>
        )
      })}
    </Flex>
  )
}

export default ob(Item, COMPONENT)
