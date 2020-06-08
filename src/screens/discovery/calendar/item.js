/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-15 17:02:41
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Text } from '@components'
import { Cover } from '@screens/_'
import { _, systemStore } from '@stores'
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

  const showScore = !systemStore.setting.hideScore && !!score
  const splitText = []
  if (air) splitText.push(`${air}话`)
  if (timeCN) splitText.push(`${timeCN.slice(0, 2)}:${timeCN.slice(2)}`)
  return (
    <View style={[styles.item, style]}>
      <View>
        <Cover
          width={imageWidth}
          height={imageHeight}
          src={images.medium}
          radius
          shadow
          onPress={onPress}
        />
        {showScore && (
          <>
            <LinearGradient
              style={styles.linear}
              colors={linearColorSm}
              pointerEvents='none'
            />
            <Text style={styles.score} bold>
              {toFixed(score, 1)}
            </Text>
          </>
        )}
      </View>
      <Touchable withoutFeedback onPress={onPress}>
        <Text
          style={_.mt.sm}
          type={isCollected ? 'main' : 'desc'}
          size={13}
          bold
          numberOfLines={2}
        >
          {HTMLDecode(name)}
        </Text>
        {!!splitText.length && (
          <Text style={_.mt.xs} size={12} type='sub' numberOfLines={2}>
            {splitText.join(' / ')}
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
    marginBottom: _.space,
    marginLeft
  },
  linear: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
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
