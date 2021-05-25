/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-25 22:05:12
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex,
  Text,
  Touchable,
  Heatmap,
  HorizontalList,
  Image
} from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars, Rank } from '@screens/_'
import { obc } from '@utils/decorators'
import { x18 } from '@utils/app'
import { pick } from '@utils/game'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { showImageViewer } from '@utils/ui'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { CDN_GAME } from '@constants/cdn'

function Item({ index, pickIndex }, { $, navigation }) {
  const styles = memoStyles()
  const isFirst = index === 0
  const {
    id,
    title,
    sub,
    cover,
    tag,
    dev,
    publish,
    platform,
    time,
    timeCn,
    score,
    rank,
    length
  } = pick(pickIndex)
  const thumbs = getThumbs(id, length)
  let tip = [
    platform.join('、'),
    time,
    timeCn && timeCn !== time ? `中文 ${timeCn}` : ''
  ]
  if (dev.join('、') === publish.join('、')) {
    tip.push(`${dev.join('、')}`)
  } else {
    tip.push(`${dev.join('、')} 开发`, `${publish.join('、')} 发行`)
  }
  tip.push(tag.join('、'))
  tip = tip.filter(item => !!item).join(' / ')

  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _image: cover
        })

        t('游戏.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex
        align='start'
        style={[styles.wrap, !isFirst && !_.flat && styles.border]}
      >
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            radius
            shadow
            type='游戏'
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <View style={_.mr.wind}>
              <Flex align='start' style={styles.body}>
                <Flex.Item>
                  <Text size={15} numberOfLines={2}>
                    <Text size={15} bold>
                      {HTMLDecode(title)}
                    </Text>
                    {!!sub && sub !== title && (
                      <Text
                        type='sub'
                        size={11}
                        lineHeight={15}
                        numberOfLines={1}
                      >
                        {' '}
                        {HTMLDecode(sub)}
                      </Text>
                    )}
                  </Text>
                </Flex.Item>
                <Flex style={_.mt.xxs}>
                  {!!collection && <Tag style={_.ml.sm} value={collection} />}
                  {x18(id) && <Tag style={_.ml.sm} value='H' />}
                </Flex>
              </Flex>
              <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={3}>
                {tip}
              </Text>
              <Flex style={_.mt.md} wrap='wrap'>
                <Rank value={rank} />
                <Stars style={_.mr.sm} value={score} simple />
              </Flex>
            </View>
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbs}
                initialRenderNums={3}
                renderItem={(item, index) => (
                  <Image
                    style={[
                      !!index && _.ml.sm,
                      index === thumbs.length - 1 && _.mr.md
                    ]}
                    key={item}
                    src={item}
                    size={96}
                    height={64}
                    radius
                    onPress={() => {
                      showImageViewer(
                        thumbs.map(item => ({
                          url: item
                        })),
                        index
                      )
                    }}
                  />
                )}
              />
            </View>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  imgContainer: {
    width: IMG_WIDTH
  },
  wrap: {
    paddingVertical: _.md + _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    minHeight: IMG_HEIGHT
  },
  body: {
    width: '100%'
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  },
  thumbs: {
    marginTop: _.md,
    height: 64
  }
}))

function getThumbs(subjectId, length) {
  if (typeof length !== 'number') {
    return []
  }

  return new Array(length)
    .fill()
    .map((item, index) => CDN_GAME(subjectId, index))
}
