/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-19 05:08:27
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars, Rank } from '@_'
import { obc } from '@utils/decorators'
import { cnjp } from '@utils/app'
import { HENTAI_TAGS, pick } from '@utils/subject/hentai'
import { t } from '@utils/fetch'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG, IMG_DEFAULT } from '@constants'

function Item({ index, pickIndex }, { $, navigation }) {
  const { id, hId, image, cn, jp, ep, air, tags, score, rank } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const isFirst = index === 0
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const tip = [ep ? `${ep}话` : '', air].filter(item => !!item).join(' / ')
  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _jp: jp,
          _image: cover,
          _hid: hId
        })

        t('Hentai.跳转', {
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
            textOnly={!$.isLogin}
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={$.isLogin && tags.length >= 14 ? styles.contentFlux : styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={styles.body}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {cnjp(cn, jp)}
                  </Text>
                </Text>
              </Flex.Item>
              <Flex>{!!collection && <Tag style={_.ml.sm} value={collection} />}</Flex>
            </Flex>
            <Text style={_.mt.xs} size={11} lineHeight={14}>
              {tip}
            </Text>
            {$.isLogin && !!tags.length && (
              <Flex style={_.mt.sm} wrap='wrap'>
                {tags.map(item => (
                  <Tag
                    key={item}
                    style={styles.tag}
                    type={getType($.state, item)}
                    value={HENTAI_TAGS[item]}
                  />
                ))}
              </Flex>
            )}
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.sm} value={score} simple />
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Hentai.跳转' />}
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
  contentFlux: {
    minHeight: IMG_HEIGHT_LG
  },
  body: {
    width: '100%'
  },
  tag: {
    marginTop: _.xs,
    marginRight: _.sm
  }
}))

function getType(state = {}, index) {
  const { chara, job, body, content } = state?.query
  const value = HENTAI_TAGS[index]
  return chara === value || job === value || body === value || content === value
    ? 'main'
    : undefined
}
