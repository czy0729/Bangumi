/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:38:06
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar } from '@components'
import { systemStore, tinygrailStore } from '@stores'
import { tinygrailOSS } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { CDN_OSS_MAGMA_MONO } from '@constants'
import { Props } from './types'

function Icon({ style, id, monoId, name, icon, size, radius, event }: Props) {
  const navigation = useNavigation()
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

  return (
    <View style={style}>
      <Avatar
        src={src}
        name={name}
        size={size}
        radius={radius}
        borderWidth={favor ? 2 : 0}
        borderColor={favor ? '#ffc107' : 'transparent'}
        skeletonType='tinygrail'
        onPress={() => {
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
        }}
      />
    </View>
  )
}

export default ob(Icon)
