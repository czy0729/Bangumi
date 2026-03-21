/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:18:06
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Katakana, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, getCoverMedium, HTMLDecode, stl } from '@utils'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { linearColor } from '../../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function CoverSm({ title, src, cn, data }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const { subjectId } = data
  const subjectJP = subjectStore.jp(subjectId) || data.title
  const subjectCN = subjectStore.cn(subjectId) || cn

  const isMusic = title === '音乐'
  const { width, height: h } = styles.cover
  const height = isMusic ? width : h

  return (
    <Touchable
      style={styles.item}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId,
            _jp: subjectJP,
            _cn: subjectCN,
            _image: getCoverSrc(src, width),
            _type: title
          })
        },
        '发现.跳转',
        {
          to: 'Subject',
          subjectId,
          from: `CoverSm|${title}`
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Cover src={getCoverMedium(src)} size={width} height={height} />
        <LinearGradient
          style={stl(styles.linear, isMusic && styles.linearMusic)}
          colors={linearColor}
          pointerEvents='none'
        />
        <View style={styles.desc} pointerEvents='none'>
          <Text type='__plain__' size={10} numberOfLines={1} bold>
            {data.info}
          </Text>
          <View style={_.mt.xs}>
            <Katakana.Provider
              itemStyle={styles.itemStyle}
              itemSecondStyle={styles.itemSecondStyle}
              type='__plain__'
              size={11}
              numberOfLines={2}
              bold
            >
              <Katakana type='__plain__' size={11} bold numberOfLines={2}>
                {HTMLDecode(cnjp(subjectCN, subjectJP))}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default observer(CoverSm)
