/*
 * @Author: czy0729
 * @Date: 2021-07-16 00:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-18 12:11:40
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { cnjp } from '@utils/app'
import { linearColor } from './ds'

const imageWidth = _.device(_.window.width * 0.28, _.window.contentWidth * 0.4)
const imageHeight = imageWidth * 1.38
const weekdayCN = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日'
}

function CoverToday({ data }, { navigation }) {
  rerender('Discovery.CoverToday')

  const styles = memoStyles()
  return (
    <View>
      <View style={styles.item}>
        <Cover
          src={data?.images?.common}
          width={imageWidth}
          height={imageHeight}
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
        <LinearGradient style={styles.linear} colors={linearColor} pointerEvents='none' />
        <View style={styles.info} pointerEvents='none'>
          <Text
            size={_.device(12, 13)}
            type={_.select('plain', 'title')}
            numberOfLines={1}
            bold
            pointerEvents='none'
          >
            {data.timeCN.slice(0, 2)}:{data.timeCN.slice(2)} · 周{weekdayCN[data.weekday]}
          </Text>
          <Text
            style={_.mt.xxs}
            size={_.device(11, 12)}
            type={_.select('plain', 'title')}
            numberOfLines={1}
            bold
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

const memoStyles = _.memoStyles(_ => ({
  item: {
    marginRight: _._wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: imageHeight * 0.5,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5,
    borderBottomRightRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusSm
  },
  info: {
    position: 'absolute',
    zIndex: 2,
    right: _.sm + 4,
    bottom: _.sm + 2,
    left: _.sm + 4,
    opacity: 0.92
  }
}))
