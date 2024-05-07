/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 05:52:59
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Katakana, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium, HTMLDecode, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { linearColor } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CoverSm({ title, src, cn, data }, { navigation }: Ctx) {
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
          _image: getCoverSrc(src, width)
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
          <View style={_.mt.xs}>
            <Katakana.Provider
              itemStyle={styles.itemStyle}
              itemSecondStyle={styles.itemSecondStyle}
              type={_.select('plain', 'title')}
              size={11}
              numberOfLines={2}
              bold
            >
              <Katakana type={_.select('plain', 'title')} size={11} bold numberOfLines={2}>
                {HTMLDecode(cn)}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default obc(CoverSm, COMPONENT)
