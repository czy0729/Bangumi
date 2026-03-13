/*
 * @Author: czy0729
 * @Date: 2021-07-16 00:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 18:12:05
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Katakana, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { cnjp, getCoverMedium, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { linearColor } from '../../../ds'
import { COMPONENT, WEEKDAY_CN } from './ds'
import { memoStyles } from './styles'

function CoverToday({ data }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { width, height } = styles.cover
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId: data.id,
            _jp: data.name,
            _cn: data.name_cn,
            _image: getCoverSrc(data?.images?.common, width)
          })
        },
        '发现.跳转',
        {
          to: 'Subject',
          subjectId: data.id,
          from: 'CoverToday'
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Cover src={getCoverMedium(data?.images?.common)} width={width} height={height} />
        <LinearGradient style={styles.linear} colors={linearColor} pointerEvents='none' />
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
          <View style={_.mt.xs} pointerEvents='none'>
            <Katakana.Provider
              itemStyle={styles.itemStyle}
              itemSecondStyle={styles.itemSecondStyle}
              size={_.device(10, 12)}
              type={_.select('plain', 'title')}
              numberOfLines={2}
              bold
            >
              <Katakana
                size={_.device(10, 12)}
                type={_.select('plain', 'title')}
                numberOfLines={2}
                bold
              >
                {HTMLDecode(cnjp(data.name_cn, data.name))}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default ob(CoverToday, COMPONENT)
