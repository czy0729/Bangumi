/*
 * @Author: czy0729
 * @Date: 2024-08-20 15:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-23 20:43:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Rate, Tag } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { findSubjectCn, getVisualLength, HTMLDecode, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'
import { memoStyles } from './styles'

import type { TextProps } from '@components'
import type { ChannelRankItem } from '@stores/discovery/types'
import type { Ctx } from '../../../types'

function ItemLg({ item, index }: { item: ChannelRankItem; index: number }) {
  const { $, navigation } = useStore<Ctx>()

  const styles = memoStyles()

  const collection = collectionStore.collect(item.id, $.typeCn) || ''
  const isMusic = $.typeCn === '音乐'
  const width = Math.floor(COVER_WIDTH * (isMusic ? 1.2 : 1))
  const height = isMusic ? width : COVER_HEIGHT
  const value = index + 1

  const title = findSubjectCn(HTMLDecode(item.name), item.id)
  const visualLength = getVisualLength(title)
  const textProps: TextProps = {
    size: visualLength >= 18 ? 14 : 15,
    lineHeight: _.device(15, 18),
    numberOfLines: 2
  } as const

  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: item.id,
          _jp: item.name,
          _image: getCoverSrc(item.cover, width),
          _type: $.typeCn
        })

        t('频道.跳转', {
          to: 'Subject',
          from: 'rank',
          type: $.type,
          subjectId: item.id
        })
      }}
    >
      <Flex align='start'>
        <Cover
          src={item.cover}
          width={width}
          height={height}
          radius={_.radiusSm}
          type={$.typeCn}
          cdn={!x18(item.id, title)}
        />

        <Flex.Item style={_.ml.md}>
          <Flex
            style={stl(styles.content, isMusic && styles.music)}
            direction='column'
            justify='between'
            align='start'
          >
            <View style={styles.name}>
              <Katakana.Provider {...textProps}>
                <Katakana {...textProps} bold>
                  {title}
                </Katakana>
              </Katakana.Provider>
              <Text style={_.mt.xs} size={12} type='sub'>
                {item.follow}
              </Text>
            </View>
            <View>{!!collection && <Tag value={collection} />}</View>
          </Flex>
        </Flex.Item>

        <Rate
          style={styles.rec}
          textStyle={stl(styles.recText, styles[`rec${value}`])}
          value={value}
        />
      </Flex>
    </Touchable>
  )
}

export default observer(ItemLg)
