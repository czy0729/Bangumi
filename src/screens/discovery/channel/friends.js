/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:39:37
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'

const itemWidth = (_.window.width - 2 * _.wind - _._wind) / 2
const imgWidth = 56
const imgHeight = imgWidth * 1.28

function Friends(props, { $, navigation }) {
  const { friends } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>好友最近关注</SectionTitle>
      <Flex style={_.mt.sm} wrap='wrap'>
        {friends.map(item => {
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
              style={styles.item}
              align='start'
            >
              <View style={styles.image}>
                <Cover
                  src={item.cover}
                  width={imgWidth}
                  height={imgHeight}
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
                <Text style={_.mt.xs} size={11} numberOfLines={1}>
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

const styles = _.create({
  item: {
    width: itemWidth,
    marginLeft: _._wind,
    marginBottom: _.space
  },
  image: {
    width: imgWidth
  }
})
