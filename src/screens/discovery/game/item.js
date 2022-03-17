/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 06:47:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap, HorizontalList, Image } from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars, Rank } from '@_'
import { obc } from '@utils/decorators'
import { x18 } from '@utils/app'
import { pick } from '@utils/subject/game'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { showImageViewer } from '@utils/ui'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG, IMG_DEFAULT } from '@constants'
import { CDN_GAME } from '@constants/cdn'

const thumbWidth = _.device(114, parseInt(_.window.contentWidth * 0.4))
const thumbHeight = parseInt(thumbWidth * 0.56)
function fixed(image) {
  if (image.includes('m/')) return image
  return `m/${image}`
}

function Item({ index, pickIndex }, { $, navigation }) {
  const styles = memoStyles()
  const isFirst = index === 0
  const {
    id,
    title,
    sub,
    cover: image,
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
  const cover = image ? `//lain.bgm.tv/pic/cover/${fixed(image)}.jpg` : IMG_DEFAULT
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
      <Flex align='start' style={[styles.wrap, !isFirst && !_.flat && styles.border]}>
        <Cover
          style={styles.image}
          src={cover}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          shadow
          type='游戏'
        />
        <Flex style={styles.content} direction='column' justify='between' align='start'>
          <View style={styles.body}>
            <Flex align='start' style={_.container.w100}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {HTMLDecode(title)}
                  </Text>
                  {!!sub && sub !== title && (
                    <Text type='sub' size={11} lineHeight={15} numberOfLines={1}>
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
            {!!(rank || score) && (
              <Flex style={_.mt.md} wrap='wrap'>
                <Rank value={rank} />
                <Stars style={_.mr.sm} value={score} simple />
              </Flex>
            )}
          </View>
          {!!thumbs.length && (
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbs}
                initialRenderNums={3}
                renderItem={(item, index) => (
                  <Image
                    style={[!!index && _.ml.sm, index === thumbs.length - 1 && _.mr.md]}
                    key={item}
                    src={item}
                    size={thumbWidth}
                    height={thumbHeight}
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
          )}
        </Flex>
      </Flex>
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    flex: 1,
    minHeight: IMG_HEIGHT_LG,
    marginLeft: _._wind
  },
  body: {
    marginRight: _.wind
  },
  thumbs: {
    marginTop: _.md,
    height: thumbHeight
  }
}))

function getThumbs(subjectId, length) {
  if (typeof length !== 'number') {
    return []
  }

  return new Array(length).fill().map((item, index) => CDN_GAME(subjectId, index))
}
