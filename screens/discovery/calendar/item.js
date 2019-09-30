/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-30 14:15:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { IMG_DEFAULT } from '@constants'
import { HTMLDecode } from '@utils/html'
import { getCoverMedium } from '@utils/app'
import _ from '@styles'

const imageWidth = _.window.width * 0.288
const imageHeight = imageWidth * 1.28
const marginLeft = (_.window.width - 3 * imageWidth) / 4

function Item(
  { style, subjectId, images = {}, name, score },
  { $, navigation }
) {
  // 是否已收藏
  const { list } = $.userCollection
  const isCollected =
    list.findIndex(item => item.subject_id === subjectId) !== -1

  const { calendarData } = $.state
  const { air, timeJP } = calendarData[subjectId] || {}
  const onPress = () => {
    navigation.push('Subject', {
      subjectId
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Image
        width={imageWidth}
        height={imageHeight}
        src={getCoverMedium(images.medium) || IMG_DEFAULT}
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text
          style={_.mt.sm}
          type={isCollected ? 'main' : 'desc'}
          numberOfLines={2}
        >
          {HTMLDecode(name)}
        </Text>
        <Flex style={_.mt.xs}>
          {!!air && (
            <Text style={_.mr.xs} size={12} type='sub'>
              {air}话
            </Text>
          )}
          {!!score && (
            <Text size={12} type='sub'>
              ({score.toFixed(1)}){' '}
            </Text>
          )}
          {!!timeJP && (
            <Text size={12} type='sub'>
              {`- ${timeJP.slice(0, 2)}:${timeJP.slice(2)}`}{' '}
            </Text>
          )}
        </Flex>
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
  }
})
