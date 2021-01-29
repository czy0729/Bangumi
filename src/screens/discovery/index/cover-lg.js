/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 15:20:53
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

const imageWidth = _.window.width - _.wind * 2
const imageHeight = imageWidth * 1.38
const linearColor = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']

function CoverLg({ title, src, cn, data }, { navigation }) {
  const styles = memoStyles()
  return (
    <View style={styles.item}>
      <Cover
        src={src}
        size={imageWidth}
        height={imageHeight}
        radius={_.radiusMd}
        placeholder={false}
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
            _image: src
          })
        }}
      />
      <LinearGradient
        style={styles.linear}
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
          {cn}
        </Text>
      </View>
    </View>
  )
}

export default obc(CoverLg)

const memoStyles = _.memoStyles(_ => ({
  item: {
    marginTop: _.space,
    marginHorizontal: _.wind,
    borderRadius: _.radiusMd,
    backgroundColor: _.colorBg,
    overflow: IOS ? 'hidden' : undefined,
    ..._.shadow
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: 96,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5,
    borderBottomRightRadius: _.radiusMd,
    borderBottomLeftRadius: _.radiusMd
  },
  desc: {
    position: 'absolute',
    zIndex: 2,
    right: _._wind - 2,
    bottom: _.space - 2,
    left: _._wind - 2,
    opacity: 0.92
  }
}))
