/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:30:23
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Squircle, Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { matchCoverUrl, getCoverLarge, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { linearColor } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function CoverLg({ title, src, cn, data }, { navigation }: Ctx) {
  rerender('Discovery.CoverLg')

  const styles = memoStyles()
  const { coverRadius, cdnOrigin } = systemStore.setting
  const isUseCDN = cdnOrigin === 'magma'
  const isMusic = title === '音乐'

  const { width, height: h } = styles.cover
  const height = isMusic ? width : h

  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        t('发现.跳转', {
          to: 'Subject',
          subjectId: data.subjectId,
          from: `CoverLg|${title}`
        })

        navigation.push('Subject', {
          subjectId: data.subjectId,
          _jp: data.title,
          _cn: cn,
          _type: title,
          _image: src,
          _imageForce: src
        })
      }}
    >
      <Squircle width={width} height={height} radius={coverRadius}>
        <Cover
          src={isUseCDN ? matchCoverUrl(src, false) : getCoverLarge(src)}
          size={width}
          height={height}
          cdn={isUseCDN}
        />
        <LinearGradient
          style={styles.linear}
          // @ts-expect-error
          colors={linearColor}
          pointerEvents='none'
        />
        <View style={styles.desc} pointerEvents='none'>
          <Text type={_.select('plain', 'desc')} bold>
            {data.info}
          </Text>
          <Text
            style={_.mt.xs}
            size={22}
            type={_.select('plain', 'title')}
            bold
            numberOfLines={2}
          >
            {HTMLDecode(cn)}
          </Text>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default obc(CoverLg)
