/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-18 11:36:50
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium } from '@utils'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { linearColor } from './ds'

function CoverSm({ title, src, cn, data }, { navigation }) {
  rerender('Discovery.CoverSm')

  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
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
        src={getCoverMedium(src)}
        size={styles.cover.width}
        height={isMusic ? styles.cover.width : styles.cover.height}
        radius
        placeholder={false}
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
      />
      <LinearGradient style={styles.linear} colors={linearColor} pointerEvents='none' />
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
    </View>
  )
}

export default obc(CoverSm)

const memoStyles = _.memoStyles(() => {
  const width = _.windowSm.contentWidth * _.device(0.34, 0.42)
  return {
    item: {
      marginRight: _._wind + 2,
      backgroundColor: _.colorBg,
      borderRadius: _.radiusSm,
      overflow: 'hidden',
      ..._.shadow,
      elevation: 12
    },
    cover: {
      width,
      height: width * 1.38
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
      bottom: 14,
      left: _._wind - 2,
      opacity: 0.92
    }
  }
})
