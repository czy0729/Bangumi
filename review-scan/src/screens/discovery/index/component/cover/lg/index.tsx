/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 18:11:33
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Katakana, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, getCoverLarge, HTMLDecode, matchCoverUrl } from '@utils'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { linearColor } from '../../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CoverLg({ title, src, cn, data }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { subjectId } = data
  const subjectJP = subjectStore.jp(subjectId) || data.title
  const subjectCN = subjectStore.cn(subjectId) || cn

  const isMusic = title === '音乐'
  const { width, height: h } = styles.cover
  const height = isMusic ? width : h

  const isUseCDN = systemStore.setting.cdnOrigin === 'magma'
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
          from: `CoverLg|${title}`
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Cover
          src={isUseCDN ? matchCoverUrl(src, false) : getCoverLarge(src)}
          size={width}
          height={height}
          cdn={isUseCDN}
        />
        <LinearGradient style={styles.linear} colors={linearColor} pointerEvents='none' />
        <View style={styles.desc} pointerEvents='none'>
          <Text type={_.select('plain', 'desc')} bold>
            {data.info}
          </Text>
          <View style={_.mt.sm}>
            <Katakana.Provider
              itemStyle={styles.itemStyle}
              itemSecondStyle={styles.itemSecondStyle}
              type={_.select('plain', 'title')}
              size={22}
              bold
              numberOfLines={2}
            >
              <Katakana size={22} type={_.select('plain', 'title')} bold numberOfLines={2}>
                {HTMLDecode(cnjp(subjectCN, subjectJP))}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </Touchable>
  )
}

export default ob(CoverLg, COMPONENT)
