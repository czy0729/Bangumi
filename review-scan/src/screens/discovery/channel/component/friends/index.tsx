/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:29:20
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { findSubjectCn, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COVER_HEIGHT_SM, COVER_WIDTH_SM } from '../rank/ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Friends() {
  const { $, navigation } = useStore<Ctx>()
  const { friends = [] } = $.channel
  if (!friends.length) return null

  const styles = memoStyles()
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>好友最近关注</SectionTitle>
      <Flex style={styles.container} wrap='wrap'>
        {friends.map((item, index) => (
          <View
            key={`${item.id}${item.userId}`}
            style={stl(styles.item, index % 2 !== 0 && styles.itemMarginLeft)}
          >
            <Touchable
              animate
              onPress={() => {
                t('频道.跳转', {
                  to: 'Subject',
                  from: 'friends',
                  type: $.type,
                  subjectId: item.id
                })

                navigation.push('Subject', {
                  subjectId: item.id,
                  _jp: item.name,
                  _image: getCoverSrc(item.cover, COVER_WIDTH_SM),
                  _type: $.typeCn
                })
              }}
            >
              <Flex align='start'>
                <View style={styles.image}>
                  <Cover
                    src={item.cover}
                    width={COVER_WIDTH_SM}
                    height={COVER_HEIGHT_SM}
                    radius
                    type={$.typeCn}
                  />
                </View>
                <Flex.Item style={$.typeCn === '音乐' ? _.ml.md : _.ml.sm}>
                  <Katakana.Provider numberOfLines={2}>
                    <Katakana bold numberOfLines={2} size={13}>
                      {findSubjectCn(item.name, item.id)}
                    </Katakana>
                  </Katakana.Provider>
                  <Text style={_.mt.xs} size={11} numberOfLines={2}>
                    <Text
                      size={11}
                      type='sub'
                      bold
                      onPress={() => {
                        t('频道.跳转', {
                          to: 'Zone',
                          from: 'friends',
                          type: $.type,
                          userId: item.userId
                        })

                        navigation.push('Zone', {
                          userId: item.userId,
                          _name: item.userName
                        })
                      }}
                    >
                      {item.userName}
                    </Text>{' '}
                    {item.action}
                  </Text>
                </Flex.Item>
              </Flex>
            </Touchable>
          </View>
        ))}
      </Flex>
    </View>
  )
}

export default ob(Friends, COMPONENT)
