/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 19:33:51
 */
import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { navigationReference } from '@utils/app'
import { info } from '@utils/ui'

let lastBackPressed

export const BackAndroid = () => {
  useEffect(() => {
    // 这里不需要remove, APP整个生命周期只注册一次
    BackHandler.addEventListener('hardwareBackPress', () => {
      const navigation = navigationReference()
      if (!navigation) return false

      // 可以认为index为0时, 在最外的Tab页面
      if (navigation?.getRootState()?.index === 0) {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          setTimeout(() => {
            BackHandler.exitApp()
          }, 0)
          return true
        }

        lastBackPressed = Date.now()
        info('再按一次退出应用')
        return true
      }

      return false
    })

    return () => {}
  }, [])

  return null
}
