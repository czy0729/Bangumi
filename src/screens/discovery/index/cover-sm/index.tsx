/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 20:24:44
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium, stl } from '@utils'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { linearColor } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function CoverSm({ title, src, cn, data }, { navigation }: Ctx) {
  // global.rerender('Discovery.CoverSm')

  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
  const isMusic = title === '音乐'
  return (
    <View style={styles.item}>
      <Touchable
        style={[
          styles.touch,
          {
            borderRadius: coverRadius
          }
        ]}
        animate
        onPress={() => {
          t('发现.跳转', {
            to: 'Subject',
            from: title,
            type: 'sm',
            subjectId: data.subjectId
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
        <Cover
          src={getCoverMedium(src)}
          size={styles.cover.width}
          height={isMusic ? styles.cover.width : styles.cover.height}
          radius
        />
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
            size={12}
            numberOfLines={2}
            bold
          >
            {HTMLDecode(cn)}
          </Text>
        </View>
      </Touchable>
    </View>
  )
}

export default obc(CoverSm)
