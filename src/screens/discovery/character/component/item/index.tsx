/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:32:19
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Katakana, Touchable } from '@components'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ index, id, avatar, name }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  return (
    <View style={stl(styles.item, index % _.portrait(5, 8) === 0 && styles.left)}>
      <Touchable
        animate
        scale={0.9}
        onPress={() => {
          t('收藏的人物.跳转', {
            to: 'Mono',
            monoId: id
          })

          navigation.push('Mono', {
            monoId: id
          })
        }}
      >
        <Image size={styles.item.width} src={avatar} radius shadow />
        <Katakana.Provider style={_.mt.sm} size={10} numberOfLines={2} align='center'>
          <Katakana size={10} numberOfLines={2} align='center' bold>
            {HTMLDecode(name)}
          </Katakana>
        </Katakana.Provider>
      </Touchable>
    </View>
  )
}

export default ob(Item, COMPONENT)
