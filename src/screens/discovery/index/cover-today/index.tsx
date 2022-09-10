/*
 * @Author: czy0729
 * @Date: 2021-07-16 00:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 07:11:34
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium, HTMLDecode, cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { linearColor } from '../ds'
import { Ctx } from '../types'
import { WEEKDAY_CN } from './ds'
import { memoStyles } from './styles'

function CoverToday({ data }, { navigation }: Ctx) {
  global.rerender('Discovery.CoverToday')

  const styles = memoStyles()
  return (
    <View>
      <View
        style={[
          styles.item,
          {
            borderRadius: systemStore.setting.coverRadius
          }
        ]}
      >
        <Cover
          src={getCoverMedium(data?.images?.common)}
          width={styles.cover.width}
          height={styles.cover.height}
          radius
          placeholder={false}
          onPress={() => {
            navigation.push('Subject', {
              subjectId: data.id,
              _jp: data.name,
              _cn: data.name_cn,
              _image: data?.images?.common
            })
          }}
        />
        <LinearGradient
          style={styles.linear}
          // @ts-ignore
          colors={linearColor}
          pointerEvents='none'
        />
        <View style={styles.info} pointerEvents='none'>
          <Text
            size={_.device(10, 13)}
            type={_.select('plain', 'title')}
            numberOfLines={1}
            bold
            // @ts-ignore
            pointerEvents='none'
          >
            {data.timeCN.slice(0, 2)}:{data.timeCN.slice(2)} · 周
            {WEEKDAY_CN[data.weekday]}
          </Text>
          <Text
            style={_.mt.xs}
            size={_.device(10, 12)}
            type={_.select('plain', 'title')}
            numberOfLines={2}
            bold
            // @ts-ignore
            pointerEvents='none'
          >
            {HTMLDecode(cnjp(data.name_cn, data.name))}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default obc(CoverToday)
