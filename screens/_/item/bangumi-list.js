/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-27 19:34:56
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { IMG_DEFAULT } from '@constants'
import { getCoverMedium } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import _ from '@styles'

const imageWidth = _.window.width * 0.16
const marginLeft = (_.window.width - 5 * imageWidth) / 6

function ItemBangumiList({ navigation, style, subjectId, images = {}, name }) {
  const onPress = () => {
    navigation.push('Subject', {
      subjectId
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Image
        size={imageWidth}
        src={getCoverMedium(images.small, true) || IMG_DEFAULT}
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

export default observer(ItemBangumiList)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: _.sm,
    marginLeft
  }
})
