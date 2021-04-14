/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 19:58:34
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Cover } from '../base'

const imageWidth = _.window.contentWidth * 0.16
const marginLeft = (_.window.contentWidth - 5 * imageWidth) / 6

export const ItemBangumiList = ob(
  ({ navigation, style, subjectId, images = {}, name, event = EVENT }) => {
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
)

const styles = _.create({
  item: {
    width: imageWidth,
    marginBottom: _.sm,
    marginLeft
  }
})
