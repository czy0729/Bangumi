/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 14:21:36
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { Avatar } from '@screens/_'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import _ from '@styles'
import { colorText } from '../styles'

const imageWidth = _.window.width * 0.28
const marginLeft = (_.window.width - 3 * imageWidth) / 4

function ItemTemple(
  { cover, avatar, name, nickname, sacrifices, level, onPress },
  { navigation }
) {
  let colorLevel
  let rate = 0.2
  if (level === 3) {
    colorLevel = _.colorDanger
    rate = 0.8
  } else if (level === 2) {
    colorLevel = _.colorWarning
    rate = 0.4
  }
  return (
    <View style={styles.item}>
      <Image
        size={imageWidth}
        height={imageWidth * 1.28}
        src={tinygrailOSS(cover)}
        radius
        imageViewer={!onPress}
        imageViewerSrc={tinygrailOSS(cover, 480)}
        border={colorLevel}
        borderWidth={3}
        onPress={onPress}
      />
      <Touchable style={_.mt.sm} withoutFeedback onPress={onPress}>
        <Flex>
          {!!avatar && (
            <Avatar
              navigation={navigation}
              size={24}
              src={avatar}
              userId={name}
              borderColor='transparent'
            />
          )}
          <Flex.Item style={_.ml.sm}>
            <Text type='plain' size={11} numberOfLines={1}>
              {HTMLDecode(nickname || name)}
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: colorText
              }}
              size={10}
            >
              {sacrifices} / +{rate}
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
    </View>
  )
}

ItemTemple.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ItemTemple)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginTop: 24,
    marginLeft
  }
})
