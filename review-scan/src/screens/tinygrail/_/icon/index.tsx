/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 00:14:15
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Avatar } from '@components'
import { systemStore, tinygrailStore } from '@stores'
import { tinygrailOSS } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { CDN_OSS_MAGMA_MONO } from '@constants'
import { Props } from './types'

function Icon({ style, id, monoId, name, icon, size, radius, event }: Props) {
  const navigation = useNavigation()

  return useObserver(() => {
    const favor = tinygrailStore.collected(id)

    let src = tinygrailOSS(icon)
    if (typeof src === 'string') src = src.replace('/r/400/pic/crt/l/', '/pic/crt/g/')
    if (
      systemStore.setting.cdn &&
      systemStore.setting.cdnOrigin === 'magma' &&
      typeof src === 'string' &&
      src.includes(HOST_IMAGE)
    ) {
      src = CDN_OSS_MAGMA_MONO(src)
    }

    const handlePress = useCallback(() => {
      navigation.push('Mono', {
        monoId: `character/${monoId || id}`,
        _name: name
      })

      if (event) {
        t(event.id, {
          to: 'Mono',
          monoId: monoId || id,
          ...event.data
        })
      }
    }, [])

    return (
      <View style={style}>
        <Avatar
          key={src}
          src={src}
          name={name}
          size={size}
          radius={radius}
          borderWidth={favor ? 2 : 0}
          borderColor={favor ? '#ffc107' : 'transparent'}
          skeletonType='tinygrail'
          onPress={handlePress}
        />
      </View>
    )
  })
}

export default Icon
