/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-21 16:46:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { IMG_DEFAULT } from '@constants'
import { HTMLDecode } from '@utils/html'
import _, { window, wind } from '@styles'

const imageWidth = window.width * 0.288
const imageHeight = imageWidth * 1.4
const marginLeft = (window.width - 3 * imageWidth) / 4

const Item = (
  { style, subjectId, images = {}, name, score },
  { $, navigation }
) => {
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
        src={images.medium || IMG_DEFAULT}
        border
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text
          style={_.mt.sm}
          size={15}
          type={isCollected ? 'main' : 'desc'}
          numberOfLines={2}
        >
          {HTMLDecode(name)}
        </Text>
        <Flex style={_.mt.xs}>
          {!!air && (
            <Text style={_.mr.xs} type='sub'>
              {air}话 |
            </Text>
          )}
          {!!timeJP && (
            <Text type='sub'>
              {`${timeJP.slice(0, 2)}:${timeJP.slice(2)}`}{' '}
            </Text>
          )}
          {!!score && <Text type='sub'>({score.toFixed(1)})</Text>}
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
    marginBottom: wind,
    marginLeft
  }
})
