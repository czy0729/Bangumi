/*
 * @Author: czy0729
 * @Date: 2021-07-16 00:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:04:31
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { cnjp, getCoverMedium, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { linearColor } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT, WEEKDAY_CN } from './ds'
import { memoStyles } from './styles'

function CoverToday({ data }, { navigation }: Ctx) {
  const styles = memoStyles()
  const { width, height } = styles.cover
  const { coverRadius } = systemStore.setting
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        t('发现.跳转', {
          to: 'Subject',
          subjectId: data.id,
          from: 'CoverToday'
        })

        navigation.push('Subject', {
          subjectId: data.id,
          _jp: data.name,
          _cn: data.name_cn,
          _image: getCoverSrc(data?.images?.common, width)
        })
      }}
    >
      <Squircle width={width} height={height} radius={coverRadius}>
        <Cover src={getCoverMedium(data?.images?.common)} width={width} height={height} />
        <LinearGradient
          style={styles.linear}
          // @ts-expect-error
          colors={linearColor}
          pointerEvents='none'
        />
        <View style={styles.info} pointerEvents='none'>
          <Text
            size={_.device(10, 13)}
            type={_.select('plain', 'title')}
            numberOfLines={1}
            bold
            pointerEvents='none'
          >
            {data.timeCN.slice(0, 2)}:{data.timeCN.slice(2)} · 周{WEEKDAY_CN[data.weekday]}
          </Text>
          <Text
            style={_.mt.xs}
            size={_.device(10, 12)}
            type={_.select('plain', 'title')}
            numberOfLines={2}
            bold
            pointerEvents='none'
          >
            {HTMLDecode(cnjp(data.name_cn, data.name))}
          </Text>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default obc(CoverToday, COMPONENT)
