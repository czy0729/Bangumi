/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:31:58
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text } from '@components'
import { SectionTitle, Cover } from '@_'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { COVER_WIDTH_SM, COVER_HEIGHT_SM } from '../rank/ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Friends(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { friends = [] } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>好友最近关注</SectionTitle>
      <Flex style={styles.container} wrap='wrap'>
        {friends.map((item, index) => {
          const onPress = () => {
            t('频道.跳转', {
              to: 'Subject',
              from: 'friends',
              type: $.type,
              subjectId: item.id
            })

            navigation.push('Subject', {
              subjectId: item.id,
              _image: item.cover,
              _jp: item.name
            })
          }
          return (
            <Flex
              key={`${item.id}${item.userId}`}
              style={[styles.item, index % 2 !== 0 && styles.itemMarginLeft]}
              align='start'
            >
              <View style={styles.image}>
                <Cover
                  src={item.cover}
                  width={COVER_WIDTH_SM}
                  height={COVER_HEIGHT_SM}
                  radius
                  shadow
                  type={$.typeCn}
                  onPress={onPress}
                />
              </View>
              <Flex.Item style={$.typeCn === '音乐' ? _.ml.md : _.ml.sm}>
                <Katakana.Provider numberOfLines={2}>
                  <Katakana bold numberOfLines={2} size={13} onPress={onPress}>
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
          )
        })}
      </Flex>
    </View>
  )
}

export default obc(Friends)
