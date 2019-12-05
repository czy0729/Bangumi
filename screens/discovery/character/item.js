/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-05 00:38:18
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'

const imageWidth = _.window.width * 0.16
const marginLeft = (_.window.width - 5 * imageWidth) / 6

function Item({ avatar, name, id }, { navigation }) {
  const onPress = () =>
    navigation.push('Mono', {
      monoId: id
    })
  return (
    <View style={styles.item}>
      <Image size={imageWidth} src={avatar} border radius onPress={onPress} />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={12} numberOfLines={2} align='center'>
          {HTMLDecode(name)}
        </Text>
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
    marginTop: _.wind,
    marginLeft
  }
})
