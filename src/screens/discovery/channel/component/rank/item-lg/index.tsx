/*
 * @Author: czy0729
 * @Date: 2024-08-20 15:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:29:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Rate, Tag } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { ChannelRankItem } from '@stores/discovery/types'
import { findSubjectCn, HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'
import { memoStyles } from './styles'

function ItemLg({ item, index }: { item: ChannelRankItem; index: number }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const collection = collectionStore.collect(item.id, $.typeCn) || ''
  const value = index + 1
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: item.id,
          _jp: item.name,
          _image: getCoverSrc(item.cover, COVER_WIDTH),
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
        <Cover src={item.cover} width={COVER_WIDTH} height={COVER_HEIGHT} radius type={$.typeCn} />
        <Flex.Item style={_.ml.md}>
          <Flex
            style={stl(styles.content, $.typeCn === '音乐' && styles.music)}
            direction='column'
            justify='between'
            align='start'
          >
            <View style={styles.name}>
              <Katakana.Provider size={15} lineHeight={_.device(15, 18)} numberOfLines={2}>
                <Katakana size={15} lineHeight={_.device(15, 18)} bold numberOfLines={2}>
                  {findSubjectCn(HTMLDecode(item.name), item.id)}
                </Katakana>
              </Katakana.Provider>
              <Text style={_.mt.xs} size={13} type='sub'>
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

export default ob(ItemLg)
