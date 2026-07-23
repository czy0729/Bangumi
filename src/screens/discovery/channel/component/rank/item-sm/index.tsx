/*
 * @Author: czy0729
 * @Date: 2024-08-20 16:32:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-23 20:49:46
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
import { COVER_HEIGHT_SM, COVER_WIDTH_SM } from '../ds'
import { styles } from './styles'

import type { TextProps } from '@components'
import type { ChannelRankItem } from '@stores/discovery/types'
import type { Ctx } from '../../../types'

function ItemSm({ item, index }: { item: ChannelRankItem; index: number }) {
  const { $, navigation } = useStore<Ctx>()

  const collection = collectionStore.collect(item.id, $.typeCn) || ''
  const isMusic = $.typeCn === '音乐'
  const value = index + 4

  const title = findSubjectCn(HTMLDecode(item.name), item.id)
  const visualLength = getVisualLength(title)
  const textProps: TextProps = {
    size: visualLength >= 18 ? 10 : visualLength >= 14 ? 11 : 12,
    lineHeight: _.device(12, 18),
    numberOfLines: isMusic ? 2 : 3
  } as const

  return (
    <View style={stl(styles.item, index % 2 !== 0 && styles.side)}>
      <Touchable
        animate
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _image: getCoverSrc(item.cover, COVER_WIDTH_SM),
            _jp: item.name,
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
            width={COVER_WIDTH_SM}
            height={COVER_HEIGHT_SM}
            radius={_.radiusSm}
            type={$.typeCn}
            cdn={!x18(item.id, title)}
          />

          <Flex.Item style={isMusic ? _.ml.md : _.ml.sm}>
            <Flex
              style={stl(styles.content, isMusic && styles.music)}
              direction='column'
              justify='between'
              align='start'
            >
              <View>
                <Katakana.Provider {...textProps}>
                  <Katakana {...textProps} bold>
                    {title}
                  </Katakana>
                </Katakana.Provider>
                <Text style={_.mt.xxs} size={11} type='sub'>
                  {item.follow}
                </Text>
              </View>
              <View>{!!collection && <Tag value={collection} />}</View>
            </Flex>
          </Flex.Item>
        </Flex>

        <Rate style={styles.rec} textStyle={styles.recText} value={value} />
      </Touchable>
    </View>
  )
}

export default observer(ItemSm)
