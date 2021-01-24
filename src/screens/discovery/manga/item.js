/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:41:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars } from '@screens/_'
import { obc } from '@utils/decorators'
import { x18 } from '@utils/app'
import { pick } from '@utils/manga'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT, IMG_DEFAULT } from '@constants'

function Item({ index, pickIndex }, { $, navigation }) {
  const {
    id,
    mangaId,
    status,
    author,
    tags,
    ep,
    cn,
    jp,
    image,
    begin,
    score,
    rank
  } = pick(pickIndex)
  if (!id) {
    return null
  }

  const styles = memoStyles()
  const isFirst = index === 0
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags).split(' ')
  const tip = [
    typeof ep === 'number' ? `第${ep}回` : ep,
    status ? '完结' : '连载',
    begin,
    author
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = $.userCollectionsMap[id]
  const indent = collection ? '　　 ' : ''
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _jp: jp,
          _cn: cn,
          _image: cover,
          _mid: mangaId
        })

        t('Manga.跳转', {
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
              {!!collection && (
                <Tag style={styles.collection} value={collection} />
              )}
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {indent}
                    {$.cnFirst ? cn : jp}
                  </Text>
                  <Text type='sub' size={11} lineHeight={15} numberOfLines={1}>
                    {' '}
                    {$.cnFirst ? jp : cn}
                  </Text>
                </Text>
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {x18(id) && <Tag style={_.ml.sm} value='H' />}
              </Flex>
            </Flex>
            <Text style={_.mt.sm} size={11} lineHeight={14}>
              {tip}
            </Text>
            <Flex style={_.mt.md} wrap='wrap'>
              <Stars style={_.mr.sm} value={score} simple />
              {!!rank && (
                <Text
                  style={_.mr.sm}
                  type='primary'
                  size={11}
                  lineHeight={12}
                  bold
                >
                  #{rank}
                </Text>
              )}
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
      {index === 0 && <Heatmap id='Manga.跳转' />}
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
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: IMG_HEIGHT
  },
  body: {
    width: '100%'
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  }
}))
