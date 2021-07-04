/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 09:28:40
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Katakana, Image } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

const num = _.device(5, 6)
const gridStyles = _.grid(num)

function Item({ index, avatar, name, id }, { navigation }) {
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
    <View style={[styles.item, _.isPad && !(index % num) && _.container.left]}>
      <Image
        style={styles.avatar}
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

const memoStyles = _.memoStyles(_ => ({
  item: {
    width: gridStyles.width,
    marginTop: _.space,
    marginLeft: gridStyles.marginLeft
  },
  avatar: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
