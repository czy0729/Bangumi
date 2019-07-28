/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 13:59:01
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { getTimestamp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { IMG_DEFAULT } from '@constants'
import _ from '@styles'

const imageWidth = _.window.width * 0.2
const marginLeft = (_.window.width - 4 * imageWidth) / 5

const CollectionsGrid = ({
  style,
  navigation,
  id,
  cover,
  name,
  nameCn,
  time,
  isOnHold
}) => {
  let holdDays
  if (isOnHold) {
    holdDays = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
  }
  const onPress = () => {
    navigation.push('Subject', {
      subjectId: id,
      _jp: name,
      _cn: nameCn,
      _image: cover
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Image
        size={imageWidth}
        src={cover || IMG_DEFAULT}
        border
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={12} numberOfLines={2}>
          {HTMLDecode(nameCn || name)}
        </Text>
        {!!holdDays && (
          <Text style={_.mt.xs} size={12} type='sub'>
            搁置{holdDays}天
          </Text>
        )}
      </Touchable>
    </View>
  )
}

export default observer(CollectionsGrid)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginLeft,
    marginBottom: _.wind
  }
})
