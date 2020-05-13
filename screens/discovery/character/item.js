/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 16:03:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

const imageWidth = _.window.width * 0.13
const marginLeft = (_.window.width - 5 * imageWidth) / 6

function Item({ avatar, name, id }, { navigation }) {
  const onPress = () => {
    t('收藏的人物.跳转', {
      to: 'Mono',
      monoId: id
    })

    navigation.push('Mono', {
      monoId: id
    })
  }
  return (
    <View style={styles.item}>
      <Image
        size={imageWidth}
        src={avatar}
        border
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={10} numberOfLines={2} align='center' bold>
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
    marginTop: _.space,
    marginLeft
  }
})
