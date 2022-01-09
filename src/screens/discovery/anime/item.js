/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 06:46:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars, Rank } from '@screens/_'
import { obc } from '@utils/decorators'
import { x18 } from '@utils/app'
import { pick } from '@utils/subject/anime'
import { t } from '@utils/fetch'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG, IMG_DEFAULT } from '@constants'

function Item({ index, pickIndex }, { $, navigation }) {
  const { id, ageId, image, cn, ep, type, status, begin, tags, official, score, rank } =
    pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const isFirst = index === 0
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags).split(' ')
  const tip = [
    type === 'TV' ? '' : type,
    String(ep).replace(/\(完结\)|第/g, ''),
    status,
    begin,
    official
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: cover,
          _aid: ageId
        })

        t('Anime.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex align='start' style={[styles.wrap, !isFirst && !_.flat && styles.border]}>
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            width={IMG_WIDTH_LG}
            height={IMG_HEIGHT_LG}
            radius
            shadow
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={styles.body}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {cn}
                  </Text>
                </Text>
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {!!collection && <Tag style={_.ml.sm} value={collection} />}
                {x18(id) && <Tag style={_.ml.sm} value='H' />}
              </Flex>
            </Flex>
            <Text style={_.mt.sm} size={11} lineHeight={14}>
              {tip}
            </Text>
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.sm} value={score} simple />
              <Flex.Item>
                <Flex>
                  {_tags.map(item => (
                    <Tag key={item} style={_.mr.sm} value={item} />
                  ))}
                </Flex>
              </Flex.Item>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Anime.跳转' />}
    </Touchable>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  imgContainer: {
    width: IMG_WIDTH_LG
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  body: {
    width: '100%'
  }
}))
