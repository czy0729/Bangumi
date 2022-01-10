/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 12:05:00
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'
import { imgWidthSm, imgHeightSm } from './rank'

function Friends(props, { $, navigation }) {
  const styles = memoStyles()
  const { friends } = $.channel
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
                  width={imgWidthSm}
                  height={imgHeightSm}
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

const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingHorizontal: _.wind,
    marginTop: _.sm
  },
  item: {
    width: '47.5%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  itemMarginLeft: {
    marginLeft: '5%'
  },
  image: {
    width: imgWidthSm
  }
}))
