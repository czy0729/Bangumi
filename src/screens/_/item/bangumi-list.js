/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:55:09
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

export const ItemBangumiList = ob(
  ({ navigation, style, subjectId, images = {}, name, event = EVENT }) => {
    const styles = memoStyles()
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
          size={styles.item.width}
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

const memoStyles = _.memoStyles(() => {
  const imageWidth = _.window.contentWidth * 0.16
  const marginLeft = (_.window.contentWidth - 5 * imageWidth) / 6
  return {
    item: {
      width: imageWidth,
      marginBottom: _.sm,
      marginLeft
    }
  }
})
