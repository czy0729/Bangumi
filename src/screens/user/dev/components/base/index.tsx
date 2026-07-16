/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:39:20
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Switch, Text, Touchable } from '@components'
import { IconTouchable, ItemSetting } from '@_'
import { _, systemStore, userStore } from '@stores'
import { styles } from './styles'

import type { NavigationProps } from '@types'

function Base({ navigation }: NavigationProps) {
  const { dev, devEvent } = systemStore.state

  const elFt = useMemo(
    () => <Switch style={styles.switch} checked={dev} onChange={systemStore.toggleDev} />,
    [dev]
  )

  return (
    <>
      <ItemSetting hd='Dev Mode' ft={elFt} withoutFeedback />
      {userStore.isDeveloper && (
        <ItemSetting
          style={_.mt._sm}
          hd='Track Points'
          ft={
            <Switch
              style={styles.switch}
              checked={devEvent.enabled}
              onChange={() => systemStore.toggleDevEvent('enabled')}
            />
          }
          withoutFeedback
        />
      )}
      {userStore.isDeveloper && (
        <ItemSetting
          style={_.mt._sm}
          hd='Playground'
          ft={
            <IconTouchable
              name='md-navigate-next'
              onPress={() => {
                navigation.push('Playground')
              }}
            />
          }
          withoutFeedback
        />
      )}
      {userStore.isDeveloper && (
        <ItemSetting
          style={_.mt._sm}
          hd='错误上报分析'
          ft={
            <IconTouchable
              name='md-navigate-next'
              onPress={() => {
                navigation.push('Log')
              }}
            />
          }
          withoutFeedback
        />
      )}
      <ItemSetting
        style={_.mt._sm}
        hd='JS Exception Test'
        ft={
          <Touchable
            onPress={() => {
              throw new Error('JS Exception Test')
            }}
          >
            <Text>一键猫叫</Text>
          </Touchable>
        }
        withoutFeedback
      />
    </>
  )
}

export default observer(Base)
