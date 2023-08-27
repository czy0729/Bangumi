/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 17:15:09
 */
import React from 'react'
import { Avatar } from '@components'
import { tinygrailStore, systemStore } from '@stores'
import { tinygrailOSS } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { HOST_IMAGE } from '@utils/app/ds'
import { CDN_OSS_MAGMA_MONO } from '@constants'
import { Navigation } from '@types'
import { memoStyles } from './styles'

function Icon(
  { id, monoId, name, icon, event },
  {
    navigation
  }: {
    navigation: Navigation
  }
) {
  const styles = memoStyles()
  const favor = tinygrailStore.collected(id)

  const { cdn, cdnOrigin } = systemStore.setting
  let src = tinygrailOSS(icon)
  if (typeof src === 'string') src = src.replace('/r/400/pic/crt/l/', '/pic/crt/g/')
  if (
    cdn &&
    cdnOrigin === 'magma' &&
    typeof src === 'string' &&
    src.includes(HOST_IMAGE)
  ) {
    src = CDN_OSS_MAGMA_MONO(src)
  }

  return (
    <Avatar
      style={styles.avatar}
      src={src}
      name={name}
      borderWidth={favor ? 2 : 0}
      borderColor={favor ? '#ffc107' : 'transparent'}
      onPress={() => {
        t(event.id, {
          to: 'Mono',
          monoId: monoId || id,
          ...event.data
        })

        navigation.push('Mono', {
          monoId: `character/${monoId || id}`,
          _name: name
        })
      }}
    />
  )
}

export default obc(Icon)
