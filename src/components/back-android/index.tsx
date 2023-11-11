/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 01:02:08
 */
import { BackHandler } from 'react-native'
import { Component } from '../component'
import { navigationReference, info } from '@utils'
import { useMount } from '@utils/hooks'

let lastBackPressed: number

/** 安卓退后拦截器 */
export const BackAndroid = () => {
  useMount(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const navigation = navigationReference()
      if (!navigation) return false

      // 可以认为 index 为 0 时, 在最外的 Tab 页面
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

    return () => {
      backHandler.remove()
    }
  })

  return <Component id='component-back-android' />
}
