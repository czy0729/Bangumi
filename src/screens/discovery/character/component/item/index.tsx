/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 07:12:39
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image, Katakana, Touchable } from '@components'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IMG_INFO_ONLY } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ImageProps } from '@components'
import type { Props } from './types'

function Item({ index, id, avatar, name }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const imageProps: ImageProps = {
    src: avatar || IMG_INFO_ONLY
  }
  if (avatar) {
    imageProps.autoSize = styles.item.width
  } else {
    imageProps.size = styles.item.width
  }

  return (
    <View style={stl(styles.item, index % _.portrait(5, 8) === 0 && styles.side)}>
      <Touchable
        animate
        scale={0.9}
        onPress={() => {
          navigation.push('Mono', {
            monoId: id
          })

          t('收藏的人物.跳转', {
            to: 'Mono',
            monoId: id
          })
        }}
      >
        <View style={styles.cover}>
          <Image {...imageProps} />
        </View>
        <Katakana.Provider style={_.mt.sm} size={11} numberOfLines={2} align='center'>
          <Katakana size={11} numberOfLines={2} align='center' bold>
            {HTMLDecode(name)}
          </Katakana>
        </Katakana.Provider>
      </Touchable>
    </View>
  )
}

export default observer(Item)
