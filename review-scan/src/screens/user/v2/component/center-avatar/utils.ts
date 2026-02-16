/*
 * @Author: czy0729
 * @Date: 2023-12-31 10:12:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:52:35
 */
import { Alert } from 'react-native'
import { systemStore, userStore } from '@stores'
import { feedback, info } from '@utils'
import { s2tAsync } from '@utils/async'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'

export function handleAvatarPress(navigation: Navigation) {
  t('我的.跳转', {
    to: 'UserSetting'
  })

  navigation.push('UserSetting')
}

export function handleOnlinePress() {
  const { onlineStatus } = systemStore.setting
  const buttons = [
    {
      text: s2tAsync('取消'),
      onPress: FROZEN_FN
    }
  ]

  if (!onlineStatus) {
    buttons.push({
      text: s2tAsync('公开'),
      onPress: async () => {
        const result = await userStore.fetchOnlines()
        if (!result) {
          info('服务出错，设置公开状态失败')
          return
        }

        systemStore.switchSetting('onlineStatus')
        if (typeof result === 'object') {
          info(`当前有 ${Object.keys(result).length} 个用户公开状态`)
        }
        feedback()

        t('我的.在线状态', {
          status: 'on'
        })
      }
    })
  } else {
    buttons.push({
      text: s2tAsync('取消公开'),
      onPress: () => {
        systemStore.switchSetting('onlineStatus')
        feedback()

        t('我的.在线状态', {
          status: 'off'
        })
      }
    })
  }

  Alert.alert(
    s2tAsync('公开在线状态'),
    s2tAsync(`此功能仅在 APP 内生效。
    \n同意公开后，在所有正在公开状态的用户间，会尽可能地在头像旁边显示在线状态标识
    \n1天内使用过 APP 是绿色标识，3天内是橙色，超过3天没有使用则会消失
    \n请注意，一旦同意后，标识会至少公开3天，尽管同意后又立马取消公开`),
    buttons
  )
}
