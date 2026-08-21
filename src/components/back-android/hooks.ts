/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { BackHandler } from 'react-native'
import { info, navigationReference } from '@utils'
import { useMount } from '@utils/hooks'
import { getBackAndroidResult } from './utils'

let lastBackPressed = 0

/** 注册安卓硬件退后拦截：根 Tab 双击退后退出应用，否则交给路由 */
export function useBackAndroid() {
  useMount(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const navigation = navigationReference()
      if (!navigation) return false

      const result = getBackAndroidResult(
        navigation.getRootState()?.index,
        lastBackPressed,
        Date.now()
      )
      if (result === 'route') return false

      if (result === 'exit') {
        setTimeout(() => {
          BackHandler.exitApp()
        }, 0)
        return true
      }

      lastBackPressed = Date.now()
      info('再按一次退出应用')
      return true
    })

    return () => {
      backHandler.remove()
    }
  })
}
