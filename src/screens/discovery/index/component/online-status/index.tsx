/*
 * @Author: czy0729
 * @Date: 2026-06-26 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-26 10:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { discoveryStore, userStore } from '@stores'
import { feedback, info } from '@utils'
import { memoStyles } from './styles'

/** 在线人数状态 */
function OnlineStatus() {
  if (!discoveryStore.online) return null

  const styles = memoStyles()
  const length = Object.keys(userStore.state.onlines || {}).length

  return (
    <>
      <Text style={styles.compact} size={12}>
        online {discoveryStore.online}
      </Text>
      {!!length && (
        <Touchable
          style={styles.badge}
          onPress={() => {
            info('客户端最近公开的在线人数')
            feedback(true)
          }}
        >
          <Text type='sub' size={11} bold>
            {length}
          </Text>
        </Touchable>
      )}
    </>
  )
}

export default observer(OnlineStatus)
