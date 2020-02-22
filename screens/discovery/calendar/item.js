/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-23 04:51:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { imageWidth, imageHeight, marginLeft } from './store'

const linearColorSm = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.8)'
]

function Item(
  { style, subjectId, images = {}, name, score },
  { $, navigation }
) {
  // 是否已收藏
  const { list } = $.userCollection
  const isCollected =
    list.findIndex(item => item.subject_id === subjectId) !== -1

  const { air, timeCN } = $.onAir[subjectId] || {}
  const onPress = () => {
    t('每日放送.跳转', {
      to: 'Subject',
      subjectId
    })

    navigation.push('Subject', {
      subjectId,
      _cn: name,
      _image: images.medium
    })
  }
  return (
    <View style={[styles.item, style]}>
      <View style={styles.cover}>
        <Cover
          width={imageWidth}
          height={imageHeight}
          src={images.medium}
          radius
          shadow
          onPress={onPress}
        />

        {!!score && (
          <>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={linearColorSm}
              pointerEvents='none'
            />
            <Text style={styles.score}>{toFixed(score, 1)}</Text>
          </>
        )}
      </View>
      <Touchable withoutFeedback onPress={onPress}>
        <Text
          style={_.mt.sm}
          size={15}
          type={isCollected ? 'main' : 'desc'}
          numberOfLines={2}
        >
          {HTMLDecode(name)}
        </Text>
        {(!!air || !!timeCN) && (
          <Text style={_.mt.xs} size={13} type='sub' numberOfLines={2}>
            {air}话{!!timeCN && ' / '}
            {`${timeCN.slice(0, 2)}:${timeCN.slice(2)}`}
          </Text>
        )}
      </Touchable>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: _.wind,
    marginLeft
  },
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  score: {
    position: 'absolute',
    zIndex: 1,
    right: _.sm,
    bottom: _.sm,
    left: _.sm,
    color: _.__colorPlain__
  }
})
