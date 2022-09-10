/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 08:10:22
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { matchCoverUrl, getCoverLarge, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { linearColor } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function CoverLg({ title, src, cn, data }, { navigation }: Ctx) {
  global.rerender('Discovery.CoverLg')

  const styles = memoStyles()
  const { coverRadius, cdnOrigin } = systemStore.setting
  const isUseCDN = cdnOrigin === 'magma'
  const isMusic = title === '音乐'
  return (
    <View
      style={[
        styles.item,
        {
          borderRadius: coverRadius
        }
      ]}
    >
      <Cover
        style={styles.touch}
        src={isUseCDN ? matchCoverUrl(src, false, '') : getCoverLarge(src)}
        size={styles.cover.width}
        height={isMusic ? styles.cover.width : styles.cover.height}
        radius
        placeholder={false}
        cdn={isUseCDN}
        onPress={() => {
          t('发现.跳转', {
            to: 'Subject',
            from: title,
            type: 'lg',
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
      />
      <LinearGradient
        style={styles.linear}
        // @ts-ignore
        colors={linearColor}
        pointerEvents='none'
      />
      <View style={styles.desc} pointerEvents='none'>
        <Text type={_.select('plain', 'desc')} bold>
          {data.info}
        </Text>
        <Text
          style={_.mt.xs}
          size={24}
          type={_.select('plain', 'title')}
          bold
          numberOfLines={2}
        >
          {HTMLDecode(cn)}
        </Text>
      </View>
    </View>
  )
}

export default obc(CoverLg)
