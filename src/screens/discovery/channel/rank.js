/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:40:30
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Katakana, Text } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

const imgWidthSm = 56
const imgHeightSm = imgWidthSm * 1.28

function Rank(props, { $, navigation }) {
  const { rankTop, rank } = $.channel
  return (
    <View style={_.mt.md}>
      <SectionTitle style={_.container.wind}>关注榜</SectionTitle>
      <View style={_.mt.sm}>
        {rankTop.map((item, index) => {
          const collection = $.userCollectionsMap[item.id]
          const indent = collection ? '　　 ' : ''
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
                <View style={styles.image}>
                  <Cover
                    src={item.cover}
                    width={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    shadow
                    type={$.typeCn}
                  />
                </View>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.mt.sm} align='start'>
                    <Flex.Item>
                      {!!collection && (
                        <Tag style={styles.collection} value={collection} />
                      )}
                      <Katakana.Provider size={15} numberOfLines={2}>
                        <Katakana size={15} bold numberOfLines={2}>
                          {indent}
                          {findSubjectCn(item.name, item.id)}
                        </Katakana>
                      </Katakana.Provider>
                      <Text style={_.mt.sm} size={13} type='sub'>
                        {item.follow}
                      </Text>
                    </Flex.Item>
                    <Text
                      style={_.ml.md}
                      type={index === 0 ? 'danger' : 'main'}
                      size={15}
                      bold
                    >
                      {index + 1}{' '}
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
            const indent = collection ? '　 　 ' : ''
            return (
              <Touchable
                key={item.id}
                style={[styles.item, index % 2 !== 0 && styles.itemMarginLeft]}
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
                  <View style={styles.imageSm}>
                    <Cover
                      src={item.cover}
                      width={imgWidthSm}
                      height={imgHeightSm}
                      shadow
                      type={$.typeCn}
                    />
                  </View>
                  <Flex.Item style={$.typeCn === '音乐' ? _.ml.md : _.ml.sm}>
                    <Flex align='start'>
                      <Flex.Item>
                        {!!collection && (
                          <Tag style={styles.collection} value={collection} />
                        )}
                        <Katakana.Provider size={13} numberOfLines={2}>
                          <Katakana size={13} bold numberOfLines={2}>
                            {indent}
                            {findSubjectCn(item.name, item.id)}
                          </Katakana>
                        </Katakana.Provider>
                        <Text style={_.mt.xs} size={11} type='sub'>
                          {item.follow}
                        </Text>
                      </Flex.Item>
                      <Text style={_.ml.xs} type='warning' size={13} bold>
                        {index + 4}
                      </Text>
                    </Flex>
                  </Flex.Item>
                </Flex>
              </Touchable>
            )
          })}
        </Flex>
      </View>
    </View>
  )
}

export default obc(Rank)

const styles = _.create({
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
    width: IMG_WIDTH
  },
  item: {
    width: '47.5%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  imageSm: {
    width: imgWidthSm
  },
  itemMarginLeft: {
    marginLeft: '5%'
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  }
})
