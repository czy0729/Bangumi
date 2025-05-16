/*
 * @Author: czy0729
 * @Date: 2025-05-14 15:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-15 06:56:40
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { tinygrailStore } from '@stores'
import { getTimestamp, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import { PARAMS } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Avatar({ navigation, src, size, userId, name, last, shadow, event }: Props) {
  const handleLongPress = useCallback(() => {
    tinygrailStore.alertUserAssets(userId, name, last)
  }, [last, name, userId])

  return useObserver(() => {
    const styles = memoStyles()
    const el = (
      <AvatarComp
        navigation={navigation}
        src={tinygrailOSS(src as string)}
        size={size}
        userId={userId}
        name={name}
        skeletonType='tinygrail'
        event={event}
        params={PARAMS}
        onLongPress={handleLongPress}
      />
    )
    return (
      <UserStatus
        style={styles.userStatus}
        last={last ? getTimestamp(last.replace('T', ' ')) : undefined}
        mini
      >
        {shadow ? <View style={styles.shadow}>{el}</View> : el}
      </UserStatus>
    )
  })
}

export default Avatar
