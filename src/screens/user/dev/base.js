/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-01 11:47:45
 */
import React from 'react'
import { Text, Switch, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'

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
        <ItemSetting
          hd='JS Exception Test'
          ft={
            // eslint-disable-next-line no-undef
            <Touchable onPress={() => yijianmaojiao()}>
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

const memoStyles = _.memoStyles(() => ({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
}))
