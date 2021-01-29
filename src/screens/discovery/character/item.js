/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 14:14:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Katakana, Image } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

function Item({ avatar, name, id }, { navigation }) {
  const styles = memoStyles()
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
        size={styles.item.width}
        src={avatar}
        radius
        shadow
        onPress={onPress}
      />
      <Touchable style={_.mt.sm} withoutFeedback onPress={onPress}>
        <Katakana.Provider size={10} numberOfLines={2} align='center'>
          <Katakana size={10} numberOfLines={2} align='center' bold>
            {HTMLDecode(name)}
          </Katakana>
        </Katakana.Provider>
      </Touchable>
    </View>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(_ => {
  const imageWidth = _.window.width * 0.13
  const marginLeft = (_.window.width - 5 * imageWidth) / 6
  return {
    item: {
      width: imageWidth,
      marginTop: _.space,
      marginLeft
    }
  }
})
