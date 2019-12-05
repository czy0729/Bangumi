/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-05 01:00:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, getCoverMedium } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { IOS, IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Tag from '../base/tag'
import Stars from '../base/stars'

const imgWidth = 96
const imgHeight = 1.28 * imgWidth

function ItemSearch({
  navigation,
  index,
  id,
  cover,
  name,
  nameCn,
  tip,
  score,
  total,
  rank,
  type,
  collected,
  comments
}) {
  const styles = memoStyles()

  // 人物高清图不是正方形的图, 所以要特殊处理
  const isMono = !id.includes('/subject/')
  const isFirst = index === 0
  return (
    <Touchable
      style={styles.container}
      highlight
      onPress={() => appNavigate(id, navigation)}
    >
      <Flex align='start' style={[styles.wrap, !isFirst && styles.border]}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            src={getCoverMedium(cover) || IMG_DEFAULT}
            resizeMode={isMono ? 'contain' : undefined}
            placeholder={!isMono}
            width={imgWidth}
            height={imgHeight}
            radius
            shadow={IOS}
          />
        </View>
        <Flex.Item style={[styles.item, _.ml.wind]}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <View>
              <Flex align='start' style={{ width: '100%' }}>
                <Flex.Item>
                  {!!name && (
                    <Text size={15} numberOfLines={2}>
                      {collected && (
                        <Text type='main' lineHeight={15}>
                          [已收藏]{' '}
                        </Text>
                      )}
                      {HTMLDecode(name)}
                      {!!comments && (
                        <Text type='main' lineHeight={15}>
                          {' '}
                          {comments}
                        </Text>
                      )}
                    </Text>
                  )}
                  {!!nameCn && nameCn !== name && (
                    <Text
                      style={_.mt.xs}
                      type='sub'
                      size={12}
                      numberOfLines={1}
                    >
                      {HTMLDecode(nameCn)}
                    </Text>
                  )}
                </Flex.Item>
                {!!type && (
                  <Tag
                    style={_.ml.sm}
                    value={MODEL_SUBJECT_TYPE.getTitle(type)}
                  />
                )}
              </Flex>
              {!!tip && (
                <Text style={_.mt.md} size={12} numberOfLines={2}>
                  {HTMLDecode(tip)}
                </Text>
              )}
            </View>
            <Flex style={_.mt.xs}>
              <Stars style={_.mr.xs} value={score} color='warning' />
              <Text style={_.mr.sm} type='sub' size={12}>
                {total}
              </Text>
              {!!rank && (
                <Text type='primary' size={12}>
                  #{rank}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemSearch)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: imgWidth
  },
  wrap: {
    paddingVertical: _.wind,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: imgHeight
  }
}))
