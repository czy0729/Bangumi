/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 开发模式开关与调试入口
 */
import { observer } from 'mobx-react'
import { Switch, Text, Touchable } from '@components'
import { IconTouchable, ItemSetting } from '@_'
import { _, systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Base() {
  r(COMPONENT)

  const navigation = useNavigation()

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
