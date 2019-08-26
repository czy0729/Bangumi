/* eslint-disable no-irregular-whitespace */
/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 20:18:00
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, Text } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

const imageBigWidth = _.window.width - _.wind * 2
const imageBigHeight = imageBigWidth * 1.28

const Item = (
  { id, bgmId, cover, airDate, eps, desc, cn, jp },
  { $, navigation }
) => (
  <View style={styles.big}>
    <Image
      src={String(cover)}
      size={imageBigWidth}
      height={imageBigHeight}
      radius={_.radiusMd}
      onPress={() =>
        navigation.push('Subject', {
          subjectId: bgmId,
          _ningMoeId: id,
          _jp: jp,
          _cn: cn,
          _image: cover
        })
      }
    />
    <LinearGradient
      colors={[
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0.32)',
        'rgba(0, 0, 0, 0.8)'
      ]}
      pointerEvents='none'
      style={StyleSheet.absoluteFill}
    />
    <View style={styles.desc} pointerEvents='none'>
      <Text style={styles.title} size={26} lineHeight={26} type='plain' bold>
        {$.cnFirst ? cn || jp : jp || cn}
        <Text type='plain' lineHeight={26} bold>
          {` ${String(airDate).slice(2)}`}
          {eps ? ` (${eps})` : ''}
        </Text>
      </Text>
      <Text type='plain' lineHeight={18} bold numberOfLines={4}>
        {String(desc).replace(/'　'/g, '')}
      </Text>
    </View>
  </View>
)

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  big: {
    marginTop: _.wind,
    marginHorizontal: _.wind,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  desc: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: _.wind,
    left: _.wind
  },
  title: {
    opacity: 0.88
  }
})
