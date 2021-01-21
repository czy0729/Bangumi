/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 17:15:04
 */
import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { navigationReference } from '@utils/app'
import { info } from '@utils/ui'

let lastBackPressed

function BackAndroid() {
  useEffect(() => {
    // 这里不需要remove, APP整个生命周期只注册一次
    BackHandler.addEventListener('hardwareBackPress', () => {
      const navigation = navigationReference()
      if (!navigation) {
        return false
      }

      if (navigation.isFocused()) {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          BackHandler.exitApp()
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

export default BackAndroid
