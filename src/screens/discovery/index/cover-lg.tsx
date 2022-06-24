/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 02:46:55
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { matchCoverUrl, getCoverLarge } from '@utils'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { linearColor } from './ds'

function CoverLg({ title, src, cn, data }, { navigation }) {
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
      <LinearGradient style={styles.linear} colors={linearColor} pointerEvents='none' />
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

const memoStyles = _.memoStyles(() => ({
  item: {
    marginTop: _.md,
    marginHorizontal: _.windSm,
    borderRadius: _.radiusMd,
    backgroundColor: _.colorBg,
    overflow: 'hidden',
    ..._.shadow
  },
  cover: {
    width: _.windowSm.contentWidth,
    height: _.windowSm.contentWidth * 1.38
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: 96,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5
  },
  desc: {
    position: 'absolute',
    zIndex: 2,
    right: _._wind - 2,
    bottom: _.md - 2,
    left: _._wind - 2,
    opacity: 0.92
  },
  touch: {
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
