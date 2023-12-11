/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:51:16
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Squircle, Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium, stl, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { linearColor } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function CoverSm({ title, src, cn, data }, { navigation }: Ctx) {
  rerender('Discovery.CoverSm')

  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
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
          from: `CoverSm|${title}`
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
        <Cover src={getCoverMedium(src)} size={width} height={height} />
        <LinearGradient
          style={stl(styles.linear, isMusic && styles.linearMusic)}
          // @ts-expect-error
          colors={linearColor}
          pointerEvents='none'
        />
        <View style={styles.desc} pointerEvents='none'>
          <Text size={10} type={_.select('plain', 'title')} numberOfLines={1} bold>
            {data.info}
          </Text>
          <Text
            style={_.mt.xs}
            type={_.select('plain', 'title')}
            size={11}
            numberOfLines={2}
            bold
          >
            {HTMLDecode(cn)}
          </Text>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default obc(CoverSm)
