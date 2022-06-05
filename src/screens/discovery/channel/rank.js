/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 13:54:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Katakana, Text } from '@components'
import { SectionTitle, Cover, Tag } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

export const imgWidth = IMG_WIDTH * 1.2
export const imgHeight = IMG_HEIGHT * 1.2
export const imgWidthSm = 72 * _.ratio
export const imgHeightSm = imgWidthSm * 1.28

function Rank(props, { $, navigation }) {
  const styles = memoStyles()
  const { rankTop, rank } = $.channel
  return (
    <View style={_.mt.md}>
      <SectionTitle style={_.container.wind}>关注榜</SectionTitle>
      <View style={_.mt.sm}>
        {rankTop.map((item, index) => {
          const collection = $.userCollectionsMap[item.id]
          return (
            <Touchable
              key={item.id}
              style={styles.itemLg}
              onPress={() => {
                t('频道.跳转', {
                  to: 'Subject',
                  from: 'rank',
                  type: $.type,
                  subjectId: item.id
                })

                navigation.push('Subject', {
                  subjectId: item.id,
                  _image: item.cover,
                  _jp: item.name
                })
              }}
            >
              <Flex align='start'>
                <Cover
                  src={item.cover}
                  width={imgWidth}
                  height={imgHeight}
                  radius
                  shadow
                  type={$.typeCn}
                />
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.mt.xs} align='start'>
                    <Flex.Item>
                      <Flex
                        style={styles.content}
                        direction='column'
                        justify='between'
                        align='start'
                      >
                        <View>
                          <Katakana.Provider
                            size={15}
                            lineHeight={_.device(15, 18)}
                            numberOfLines={2}
                          >
                            <Katakana
                              size={15}
                              lineHeight={_.device(15, 18)}
                              bold
                              numberOfLines={2}
                            >
                              {findSubjectCn(HTMLDecode(item.name), item.id)}
                            </Katakana>
                          </Katakana.Provider>
                          <Text style={_.mt.xs} size={13} type='sub'>
                            {item.follow}
                          </Text>
                        </View>
                        <View>{!!collection && <Tag value={collection} />}</View>
                      </Flex>
                    </Flex.Item>
                    <Text
                      style={_.ml.md}
                      type={index === 0 ? 'danger' : 'main'}
                      size={15}
                      bold
                    >
                      {index + 1}
                    </Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </Touchable>
          )
        })}
        <Flex style={styles.container} wrap='wrap'>
          {rank.map((item, index) => {
            const collection = $.userCollectionsMap[item.id]
            return (
              <View
                key={item.id}
                style={[styles.item, index % 2 !== 0 && styles.itemMarginLeft]}
              >
                <Touchable
                  onPress={() => {
                    t('频道.跳转', {
                      to: 'Subject',
                      from: 'rank',
                      type: $.type,
                      subjectId: item.id
                    })

                    navigation.push('Subject', {
                      subjectId: item.id,
                      _image: item.cover,
                      _jp: item.name
                    })
                  }}
                >
                  <Flex align='start'>
                    <Cover
                      src={item.cover}
                      width={imgWidthSm}
                      height={imgHeightSm}
                      radius
                      shadow
                      type={$.typeCn}
                    />
                    <Flex.Item style={$.typeCn === '音乐' ? _.ml.md : _.ml.sm}>
                      <Flex align='start'>
                        <Flex.Item>
                          <Flex
                            style={styles.contentSm}
                            direction='column'
                            justify='between'
                            align='start'
                          >
                            <View>
                              <Katakana.Provider
                                size={12}
                                lineHeight={_.device(12, 18)}
                                numberOfLines={3}
                              >
                                <Katakana
                                  size={12}
                                  lineHeight={_.device(12, 18)}
                                  bold
                                  numberOfLines={3}
                                >
                                  {findSubjectCn(HTMLDecode(item.name), item.id)}
                                </Katakana>
                              </Katakana.Provider>
                              <Text style={_.mt.xxs} size={11} type='sub'>
                                {item.follow}
                              </Text>
                            </View>
                            <View>{!!collection && <Tag value={collection} />}</View>
                          </Flex>
                        </Flex.Item>
                        <Text style={_.ml.xs} type='warning' size={13} bold>
                          {index + 4}
                        </Text>
                      </Flex>
                    </Flex.Item>
                  </Flex>
                </Touchable>
              </View>
            )
          })}
        </Flex>
      </View>
    </View>
  )
}

export default obc(Rank)

const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingHorizontal: _.wind
  },
  itemLg: {
    width: '100%',
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginBottom: 4
  },
  image: {
    width: imgWidth
  },
  item: {
    width: '48%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  content: {
    height: imgHeight - 2 * _.xs
  },
  imageSm: {
    width: imgWidthSm
  },
  contentSm: {
    height: imgHeightSm
  },
  itemMarginLeft: {
    marginLeft: '4%'
  }
}))
