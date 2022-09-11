/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 12:31:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { Tag, Cover, Stars, Rank } from '@_'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { HENTAI_TAGS, pick } from '@utils/subject/hentai'
import { t } from '@utils/fetch'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG, IMG_DEFAULT } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
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

function getType(state: any = {}, index: number): 'main' | undefined {
  const { chara, job, body, content } = state?.query
  const value = HENTAI_TAGS[index]
  return chara === value || job === value || body === value || content === value
    ? 'main'
    : undefined
}
