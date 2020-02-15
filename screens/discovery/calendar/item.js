/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-15 13:10:36
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { imageWidth, imageHeight, marginLeft } from './store'

function Item(
  { style, subjectId, images = {}, name, score },
  { $, navigation }
) {
  // 是否已收藏
  const { list } = $.userCollection
  const isCollected =
    list.findIndex(item => item.subject_id === subjectId) !== -1

  const { air, timeCN } = $.onAir[subjectId] || {}
  const onPress = () => {
    t('每日放送.跳转', {
      to: 'Subject',
      subjectId
    })

    navigation.push('Subject', {
      subjectId,
      _cn: name,
      _image: images.medium
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Cover
        width={imageWidth}
        height={imageHeight}
        src={images.medium}
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text
          style={_.mt.sm}
          size={12}
          type={isCollected ? 'main' : 'desc'}
          numberOfLines={2}
        >
          {HTMLDecode(name)}
        </Text>
        <Text style={_.mt.xs} numberOfLines={2}>
          {!!timeCN && (
            <Text size={11} type='sub'>
              {`${timeCN.slice(0, 2)}:${timeCN.slice(2)}`}{' '}
            </Text>
          )}
          {!!air && (
            <Text size={11} type='sub'>
              {air}话{' '}
            </Text>
          )}
          {!!score && (
            <Text size={11} type='sub'>
              ({toFixed(score, 1)})
            </Text>
          )}
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
    marginBottom: _.wind,
    marginLeft
  }
})
