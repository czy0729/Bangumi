/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:16:42
 */
import React from 'react'
import { Switch, Text, Touchable } from '@components'
import { IconTouchable, ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import { memoStyles } from './styles'

function Base({ navigation }: NavigationProps) {
  return useObserver(() => {
    const styles = memoStyles()
    const { dev, devEvent } = systemStore.state
    return (
      <>
        <ItemSetting
          hd='Dev Mode'
          ft={<Switch style={styles.switch} checked={dev} onChange={systemStore.toggleDev} />}
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
        {userStore.isDeveloper && (
          <ItemSetting
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
