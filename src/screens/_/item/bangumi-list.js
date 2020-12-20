/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-20 19:52:58
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Cover from '../base/cover'

const imageWidth = _.window.contentWidth * 0.16
const marginLeft = (_.window.contentWidth - 5 * imageWidth) / 6

function ItemBangumiList({
  navigation,
  style,
  subjectId,
  images,
  name,
  event
}) {
  const onPress = () => {
    const { id, data = {} } = event
    t(id, {
      to: 'Subject',
      subjectId,
      ...data
    })

    navigation.push('Subject', {
      subjectId,
      _cn: name,
      _image: images.small
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Cover
        size={imageWidth}
        src={images.small}
        radius
        shadow
        onPress={onPress}
      />
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={11} numberOfLines={2} bold>
          {HTMLDecode(name)}
        </Text>
      </Touchable>
    </View>
  )
}

ItemBangumiList.defaultProps = {
  images: {},
  event: EVENT
}

export default observer(ItemBangumiList)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: _.sm,
    marginLeft
  }
})
