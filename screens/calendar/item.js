/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 19:56:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { IMG_DEFAULT } from '@constants'
import { HTMLDecode } from '@utils/html'
import _, { window, wind } from '@styles'

const imageWidth = window.width * 0.2
const marginLeft = (window.width - 4 * imageWidth) / 5

const Item = (
  { style, subjectId, images = {}, name, score, air },
  { navigation }
) => {
  const onPress = () => {
    navigation.push('Subject', {
      subjectId
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Image
        size={imageWidth}
        src={images.medium || IMG_DEFAULT}
        border
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={12} numberOfLines={2}>
          {HTMLDecode(name)}
        </Text>
        <Flex style={_.mt.xs}>
          {!!air && (
            <Text style={_.mr.xs} size={12} type='sub'>
              {air}集
            </Text>
          )}
          {!!score && (
            <Text size={12} type='sub'>
              ({score})
            </Text>
          )}
        </Flex>
      </Touchable>
    </View>
  )
}

Item.contextTypes = {
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
