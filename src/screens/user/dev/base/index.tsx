/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 04:03:37
 */
import React from 'react'
import { Text, Switch, Touchable } from '@components'
import { ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function Base() {
  return useObserver(() => {
    const styles = memoStyles()
    const { dev, devEvent } = systemStore.state
    return (
      <>
        <ItemSetting
          hd='Dev Mode'
          ft={
            <Switch
              style={styles.switch}
              checked={dev}
              onChange={systemStore.toggleDev}
            />
          }
          withoutFeedback
        />
        {userStore.isDeveloper && (
          <ItemSetting
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
        <ItemSetting
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
  })
}

export default Base
