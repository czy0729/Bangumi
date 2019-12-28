/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-23 09:46:11
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { _ } from '@stores'
import { getCoverMedium } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IMG_DEFAULT, EVENT } from '@constants'

const imageWidth = _.window.width * 0.16
const marginLeft = (_.window.width - 5 * imageWidth) / 6

function ItemBangumiList({
  navigation,
  style,
  subjectId,
  images,
  name,
  event
}) {
  const _image = getCoverMedium(images.small, true)
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
      _image
    })
  }
  return (
    <View style={[styles.item, style]}>
      <Image
        size={imageWidth}
        src={_image || IMG_DEFAULT}
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
