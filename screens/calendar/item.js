/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 19:14:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import _, { window, wind } from '@styles'

const containerWidth = window.width - 2 * wind
const imageWidth = containerWidth * 0.3
const marginRight = (containerWidth - 3 * imageWidth) / 2

const Item = (
  { style, index, subjectId, images = {}, name },
  { navigation }
) => {
  const _style = [styles.item]
  const onPress = () => {
    navigation.navigate('Subject', {
      subjectId
    })
  }
  if ((index + 1) % 3 !== 0) {
    _style.push(styles.mr)
  }
  if (style) {
    _style.push(style)
  }
  return (
    <View style={_style}>
      <Image
        size={imageWidth}
        src={images.medium}
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} numberOfLines={2}>
          {name}
        </Text>
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
    marginBottom: 24
  },
  mr: {
    marginRight
  }
})
