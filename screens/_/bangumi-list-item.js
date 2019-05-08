/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:12:35
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { IMG_DEFAULT } from '@constants'
import { HTMLDecode } from '@utils/html'
import _, { window, sm } from '@styles'

const imageWidth = window.width * 0.16
const marginLeft = (window.width - 5 * imageWidth) / 6

const Item = ({ navigation, style, subjectId, images = {}, name }) => {
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
        <Text style={_.mt.sm} size={11} numberOfLines={2}>
          {HTMLDecode(name)}
        </Text>
      </Touchable>
    </View>
  )
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: sm,
    marginLeft
  }
})
