/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:44:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 07:04:57
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { linearColor } from './ds'

function CoverSm({ title, src, cn, data }, { navigation }) {
  rerender('Discovery.CoverSm')

  const styles = memoStyles()
  return (
    <View style={styles.item}>
      <Cover
        src={src}
        size={styles.cover.width}
        height={styles.cover.height}
        radius={_.radiusSm}
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
  const width = _.windowSm.contentWidth * _.device(0.34, 0.4)
  return {
    item: {
      marginRight: _._wind + 2,
      backgroundColor: _.colorBg,
      borderRadius: _.radiusSm,
      overflow: 'hidden',
      ..._.shadow
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
      marginBottom: -0.5,
      borderBottomRightRadius: _.radiusSm,
      borderBottomLeftRadius: _.radiusSm
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
